import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import translations from "@/translations/getTranslation";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { toolId, value = false, userId } = await request.json();
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

  if (!toolId || !userId) {
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
  } else {
    await prisma.toolAccess.create({
      data: {
        toolId,
        userId,
        access: value,
      },
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
  });
}
