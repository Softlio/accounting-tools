"use server";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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
