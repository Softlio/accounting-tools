import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName } = await request.json();

  if (!email || !password || !firstName || !lastName) {
    return new NextResponse(JSON.stringify({ error: "missing fields" }), {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return new NextResponse(JSON.stringify({ error: "user already exists" }), {
      status: 400,
    });
  }
  const saltedPassword = bcrypt.hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: saltedPassword,
      firstName: firstName,
      lastName: lastName,
    },
  });

  if (!newUser) {
    return new NextResponse(JSON.stringify({ error: "user already exists" }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
  });
}
