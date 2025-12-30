import { calculateIncomeTax } from "@/lib/calculate-income-tax";
import { Logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import IncomeTaxPdf from "@/pdfs/IncomeTaxPdf";
import { renderToBuffer } from "@joshuajaco/react-pdf-renderer-bundled";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  if (!id) {
    Logger.error("downloadIncomeTax", "No id provided");
    return new NextResponse("No id provided", { status: 400 });
  }

  try {
    const incomeTaxCalculation = await prisma.incomeTaxCalculation.findUnique({
      where: {
        id: id,
      },
      include: {
        payment: true,
      },
    });

    if (!incomeTaxCalculation) {
      Logger.error("downloadIncomeTax", "No income tax calculation found");
      return new NextResponse("No income tax calculation found", {
        status: 404,
      });
    }

    if (incomeTaxCalculation.payment.status !== "paid") {
      Logger.error("downloadIncomeTax", "Payment not paid");
      return new NextResponse("No payment found", { status: 404 });
    }
    const input = {
      revenue: incomeTaxCalculation.revenue,
      year: `${incomeTaxCalculation.year ?? "2023"}`,
      hours_worked: incomeTaxCalculation.workedMoreThan1225Hours,
      starter_deduction: incomeTaxCalculation.eligibleForStarterDeduction,
      salaried: incomeTaxCalculation.hadSalariedEmployment,
      annual_salary: incomeTaxCalculation.annualIncome ?? 0,
      tax_withheld: incomeTaxCalculation.taxWithheld ?? 0,
    };

    const result = calculateIncomeTax(input);

    const buffer = await renderToBuffer(
      <IncomeTaxPdf
        values={result}
        input={input}
        id={id}
        createdAt={incomeTaxCalculation.payment.paidAt ?? new Date()}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="income_tax_${incomeTaxCalculation.id}.pdf"`,
      },
    });
  } catch (error) {
    Logger.error(
      "downloadIncomeTax",
      "Error while generating income tax pdf: " + JSON.stringify(error)
    );
    return new NextResponse("Internal server error", { status: 500 });
  }
}
