import { authOptions } from "@/lib/auth";
import { Logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    Logger.error("getTools", "Unauthorized");
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  const u = session.user as User | undefined;
  if (!u) {
    Logger.error("getTools", "Unauthorized");
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  if (u.role === "ADMIN") {
    Logger.info("getTools", "Admin access");
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
