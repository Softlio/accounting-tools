import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import translations from "@/translations/getTranslation";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import { authOptions } from "@/lib/auth";

export async function GET() {
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
  if (!u) {
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  if (u.role === "ADMIN") {
    const tools = await prisma.tool.findMany({});

    return new NextResponse(JSON.stringify(tools), {
      status: 200,
    });
  }

  const toolAccess = await prisma.toolAccess.findMany({
    where: {
      userId: u.id,
      access: true,
    },
    include: {
      tool: true,
    },
  });

  const tools = toolAccess.map((t) => t.tool);

  return new NextResponse(JSON.stringify(tools), {
    status: 201,
  });
}
