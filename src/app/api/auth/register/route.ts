import { Logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName, role } = await request.json();

  if (!email || !password || !firstName || !lastName) {
    Logger.error("register", "Missing fields");
    return new NextResponse(
      JSON.stringify({ error: translations.register.missingFields }),
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    Logger.error("register", "User already exists " + JSON.stringify(email));
    return new NextResponse(
      JSON.stringify({ error: translations.register.alreadyExists }),
      {
        status: 400,
      }
    );
  }
  const saltedPassword = bcrypt.hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: saltedPassword,
      firstName: firstName,
      lastName: lastName,
      role: role ?? "USER",
    },
  });

  if (!newUser) {
    Logger.error("register", "Error creating user " + JSON.stringify(email));
    return new NextResponse(
      JSON.stringify({ error: translations.register.alreadyExists }),
      {
        status: 400,
      }
    );
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
  });
}
