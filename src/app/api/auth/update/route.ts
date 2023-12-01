import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import translations from "@/translations/getTranslation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { email, firstName, lastName, role } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  const u = session.user as User | undefined;
  if (u?.role !== "ADMIN") {
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  if (!email || !firstName || !lastName || !role) {
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

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: translations.register.doesntExist }),
      {
        status: 400,
      }
    );
  }

  if (!(u.role === "ADMIN" || u.id === user.id)) {
    return new NextResponse(
      JSON.stringify({ error: translations.register.doesntExist }),
      {
        status: 400,
      }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: user.role === "ADMIN" ? role : user.role,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
  });
}
