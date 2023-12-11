import { mollieClient } from "@/lib/mollie";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.missingFields }),
      {
        status: 400,
      }
    );
  }

  const payment = await mollieClient.payments.get(id);

  if (!payment) {
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
      {
        status: 500,
      }
    );
  }

  try {
    await prisma.payment.update({
      where: {
        mollieId: payment.id,
      },
      data: {
        status: payment.status,
        method: payment.method,
        paidAt: payment.paidAt,
      },
    });

    return new NextResponse(undefined, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
      {
        status: 500,
      }
    );
  }
}
