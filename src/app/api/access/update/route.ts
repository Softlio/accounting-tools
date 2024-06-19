import { authOptions } from "@/lib/auth";
import { Logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { toolId, value = false, userId } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    Logger.error("updateAccess", "Unauthorized");
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  const u = session.user as User | undefined;
  if (u?.role !== "ADMIN") {
    Logger.error("updateAccess", "Unauthorized");
    return new NextResponse(
      JSON.stringify({ error: translations.register.unauthorized }),
      {
        status: 401,
      }
    );
  }

  if (!toolId || !userId) {
    Logger.error("updateAccess", "Missing fields");
    return new NextResponse(
      JSON.stringify({ error: translations.register.missingFields }),
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    Logger.error("updateAccess", "User not found " + JSON.stringify(userId));
    return new NextResponse(
      JSON.stringify({ error: translations.register.doesntExist }),
      {
        status: 400,
      }
    );
  }

  const tool = await prisma.tool.findUnique({
    where: {
      id: toolId,
    },
  });

  if (!tool) {
    Logger.error("updateAccess", "Tool not found " + JSON.stringify(toolId));
    return new NextResponse(
      JSON.stringify({ error: translations.register.doesntExist }),
      {
        status: 400,
      }
    );
  }

  const toolAccess = await prisma.toolAccess.findFirst({
    where: {
      toolId,
      userId,
    },
  });

  if (toolAccess) {
    try {
      await prisma.toolAccess.update({
        where: {
          id: toolAccess.id,
        },
        data: {
          toolId,
          userId,
          access: value,
        },
      });
    } catch (error) {
      Logger.error(
        "updateAccess",
        "Error updating access: " + JSON.stringify(error)
      );
    }
  } else {
    try {
      await prisma.toolAccess.create({
        data: {
          toolId,
          userId,
          access: value,
        },
      });
    } catch (error) {
      Logger.error(
        "updateAccess",
        "Error creating access: " + JSON.stringify(error)
      );
    }
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
  });
}
