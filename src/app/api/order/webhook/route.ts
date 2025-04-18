import { Logger } from "@/lib/logger";
import { mollieClient } from "@/lib/mollie";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id");

  if (id === null) {
    Logger.error("paymentWebhook", "Missing id");
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.missingFields }),
      {
        status: 400,
      }
    );
  }

  const payment = await mollieClient.payments.get(id.toString());

  if (!payment) {
    Logger.error("paymentWebhook", "Payment not found");
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
    Logger.error(
      "paymentWebhook",
      "Error updating payment: " + JSON.stringify(error)
    );
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
      {
        status: 500,
      }
    );
  }
}
