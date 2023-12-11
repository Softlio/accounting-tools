import { calculateIncomeTax } from "@/lib/calculate-income-tax";
import { prisma } from "@/lib/prisma";
import IncomeTaxPdf from "@/pdfs/IncomeTaxPdf";
import { renderToBuffer } from "@joshuajaco/react-pdf-renderer-bundled";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: {
  params: {
    id: string;
  };
}) {

  if (!id) {
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
      return new NextResponse("No income tax calculation found", {
        status: 404,
      });
    }

    if (incomeTaxCalculation.payment.status !== "paid") {
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
    }

    const result = calculateIncomeTax(input);

    const buffer = await renderToBuffer(
      <IncomeTaxPdf values={result} input={input} id={id} createdAt={incomeTaxCalculation.payment.paidAt ?? new Date()} />,
    );

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="income_tax_${incomeTaxCalculation.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error while generating income tax pdf");
    console.log(error)
    return new NextResponse("Internal server error", { status: 500 });
  }
}

