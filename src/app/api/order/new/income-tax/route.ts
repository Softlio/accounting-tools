import { transporter } from "@/lib/email";
import { Logger } from "@/lib/logger";
import { mollieClient } from "@/lib/mollie";
import { prisma } from "@/lib/prisma";
import { getIncomeTaxEmail } from "@/tools/IncomeTax/getIncomeTaxEmail";
import translations from "@/translations/getTranslation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    revenue,
    year,
    workedMoreThan1225Hours,
    eligibleForStarterDeduction,
    hadSalariedEmployment,
    annualIncome,
    taxWithheld,
    email,
    name,
  } = await request.json();

  if (!revenue || !year || !email) {
    Logger.error("newIncomeTaxOrder", "Missing fields");
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.missingFields }),
      {
        status: 400,
      }
    );
  }

  const price = await prisma.settings.findUnique({
    where: {
      key: "income-tax-price",
    },
  });

  const currency = (await prisma.settings.findUnique({
    where: {
      key: "payment-currency",
    },
  })) ?? {
    value: "EUR",
  };

  if (!price) {
    Logger.error("newIncomeTaxOrder", "Price not found");
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
      {
        status: 500,
      }
    );
  }

  const paymentMethods = (await prisma.settings.findUnique({
    where: {
      key: "payment-methods",
    },
  })) ?? {
    value: "ideal,creditcard",
  };

  try {
    const payment = await mollieClient.payments.create({
      amount: {
        value: price.value,
        currency: currency.value,
      },
      description: translations.newOrder.incomeTaxOrderDescription,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order/income-tax`,
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/webhook`,
      method: paymentMethods.value.split(",") as any,
    });

    const prismaPayment = await prisma.payment.create({
      data: {
        mollieId: payment.id,
        createdAt: payment.createdAt,
        amount: payment.amount.value,
        currency: payment.amount.currency,
        description: payment.description,
        method: payment.method,
        metadata: payment.metadata,
        status: payment.status,
        expiresAt: payment.expiresAt,
        checkoutUrl: payment._links.checkout?.href ?? "",
      },
    });

    const incomeTaxCalculation = await prisma.incomeTaxCalculation.create({
      data: {
        paymentId: prismaPayment.id,
        revenue,
        year: parseInt(year) ?? new Date().getFullYear(),
        workedMoreThan1225Hours: workedMoreThan1225Hours ?? false,
        eligibleForStarterDeduction: eligibleForStarterDeduction ?? false,
        hadSalariedEmployment: hadSalariedEmployment ?? false,
        annualIncome: annualIncome ?? 0,
        taxWithheld: taxWithheld ?? 0,
      },
    });

    if (!payment._links.checkout?.href) {
      Logger.error("newIncomeTaxOrder", "Checkout URL not found");
      return new NextResponse(
        JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
        {
          status: 500,
        }
      );
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: translations.incomeTaxTool.email.subject,
      html: getIncomeTaxEmail({
        name: name ?? "User",
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/download/income-tax/${incomeTaxCalculation.id}`,
        orderId: incomeTaxCalculation.id,
      }),
    });

    return new NextResponse(
      JSON.stringify({ url: payment._links.checkout.href }),
      {
        status: 200,
      }
    );
  } catch (error) {
    Logger.error(
      "newIncomeTaxOrder",
      "Error creating order: " + JSON.stringify(error) + "user" + name
    );
    return new NextResponse(
      JSON.stringify({ error: translations.newOrder.errorCreatingOrder }),
      {
        status: 500,
      }
    );
  }
}
