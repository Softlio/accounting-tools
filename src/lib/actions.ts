"use server";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transporter } from "./email";
import { getInviteEmail } from "./getInviteEmail";
import { getReInviteEmail } from "./getReInviteEmail";
import { Logger } from "./logger";
import { generateRandomPassword } from "./utils";

export async function createUser(prevState: any, formData: FormData) {
  const rawFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
    role: formData.get("role"),
  };

  const { email, password, firstName, lastName, role } = rawFormData;

  if (!email || !password || !firstName || !lastName) {
    return {
      message: translations.register.missingFields,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (user) {
    return {
      message: translations.register.alreadyExists,
    };
  }
  const saltedPassword = bcrypt.hashSync(password as string, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email as string,
      password: saltedPassword as string,
      firstName: firstName as string,
      lastName: lastName as string,
      role: (role as any) ?? "USER",
    },
  });

  if (!newUser) {
    return {
      message: translations.register.alreadyExists,
    };
  }

  redirect("/admin/customers/" + newUser.id);
}

export async function firstLogin(prevState: any, formData: FormData) {
  const rawFormData = {
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };

  const id = formData.get("id");

  const { password, confirm } = rawFormData;

  if (!password || !confirm) {
    return {
      message: translations.firstLogin.missingFields,
    };
  }

  if (!id || typeof id !== "string") {
    return {
      message: translations.firstLogin.error,
    };
  }

  if (password !== confirm) {
    return {
      message: translations.firstLogin.passwordsDontMatch,
    };
  }

  const saltedPassword = bcrypt.hashSync(password as string, 10);
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: saltedPassword as string,
      firstLogin: false,
    },
  });

  if (!updatedUser) {
    return {
      message: translations.firstLogin.error,
    };
  }

  redirect("/dashboard");
}

export const inviteUser = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    tools: Array.from(formData.entries())
      .filter((e) => e[1] === "on")
      .map((e) => e[0]),
  };

  const { email, firstName, lastName, tools } = rawFormData;

  if (!email || !firstName || !lastName) {
    return {
      message: translations.customer.invite.missingFields,
      success: false,
    };
  }

  const tempPassword = generateRandomPassword(20);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (existingUser) {
    return {
      message: translations.customer.invite.alreadyExists,
      success: false,
    };
  }

  try {
    const saltedPassword = bcrypt.hashSync(tempPassword as string, 10);
    const user = await prisma.user.create({
      data: {
        email: email as string,
        firstName: firstName as string,
        lastName: lastName as string,
        role: "USER",
        password: saltedPassword,
        pending: true,
        firstLogin: true,
      },
    });

    for (const tool of tools) {
      await prisma.toolAccess.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          tool: {
            connect: {
              id: tool,
            },
          },
          access: true,
        },
      });
    }

    try {
      console.log("Invited user with temp password ", email, tempPassword);
      Logger.info(
        "invite",
        "Invited user with temp password " + email + " " + tempPassword
      );
      const emailToSend = getInviteEmail({
        name: firstName as string,
        password: tempPassword,
      });

      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email as string,
        subject: translations.invite.email.subject,
        html: emailToSend,
      });
    } catch (error) {
      Logger.error(
        "inviteUser",
        "Error sending email: " + JSON.stringify(error)
      );
      console.log("Error sending email: ", email);

      return {
        message: translations.customer.invite.error,
        success: false,
      };
    }

    revalidatePath("/admin/customers");
    return {
      message: translations.customer.invite.success,
      success: true,
    };
  } catch (error) {
    Logger.error("inviteUser", "Error inviting user: " + JSON.stringify(error));
    return {
      message: translations.customer.invite.error,
      success: false,
    };
  }
};

export const reInviteUser = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
  };

  const { email } = rawFormData;

  if (!email) {
    return {
      message: translations.customer.invite.missingFields,
      success: false,
    };
  }

  const tempPassword = generateRandomPassword(20);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (!existingUser) {
    return {
      message: translations.customer.invite.doesNotExist,
      success: false,
    };
  }

  try {
    const saltedPassword = bcrypt.hashSync(tempPassword as string, 10);
    const user = await prisma.user.update({
      where: {
        email: email as string,
      },
      data: {
        password: saltedPassword,
        pending: true,
        firstLogin: true,
      },
    });

    try {
      console.log("Re-Invited user with temp password", email, tempPassword);
      Logger.info(
        "reinvite",
        "Re-Invited user with temp password " + email + " " + tempPassword
      );
      const emailToSend = getReInviteEmail({
        name: user.firstName as string,
        password: tempPassword,
      });

      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email as string,
        subject: translations.invite.email.subject,
        html: emailToSend,
      });
    } catch (error) {
      Logger.error(
        "reinviteUser",
        "Error sending email: " + JSON.stringify(error)
      );
      console.log("Error sending email: ", email);

      return {
        message: translations.customer.invite.error,
        success: false,
      };
    }

    revalidatePath("/admin/customers");
    return {
      message: translations.customer.invite.success,
      success: true,
    };
  } catch (error) {
    Logger.error(
      "reinviteUser",
      "Error inviting user: " + JSON.stringify(error)
    );
    return {
      message: translations.customer.invite.error,
      success: false,
    };
  }
};

export const deleteUser = async (prevState: any, formData: FormData) => {
  const id = formData.get("id");

  if (!id) {
    Logger.error("deleteUser", "No ID provided");
    return {
      message: translations.customer.delete.error,
      success: false,
    };
  }

  const user = await prisma.user.delete({
    where: {
      id: id as string,
    },
  });

  if (!user) {
    Logger.error("deleteUser", "Error deleting user: " + JSON.stringify(user));
    return {
      message: translations.customer.delete.error,
      success: false,
    };
  }

  revalidatePath("/admin/customers");
  redirect("/admin/customers");
};
