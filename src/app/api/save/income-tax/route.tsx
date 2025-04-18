import { calculateIncomeTax } from "@/lib/calculate-income-tax";
import { Logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import IncomeTaxPdf from "@/pdfs/IncomeTaxPdf";
import { renderToBuffer } from "@joshuajaco/react-pdf-renderer-bundled";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    id,
    revenue,
    year,
    workedMoreThan1225Hours,
    eligibleForStarterDeduction,
    hadSalariedEmployment,
    annualIncome,
    taxWithheld,
  } = await request.json();

  const input = {
    revenue: revenue,
    year: `${year ?? "2023"}`,
    hours_worked: workedMoreThan1225Hours,
    starter_deduction: eligibleForStarterDeduction,
    salaried: hadSalariedEmployment,
    annual_salary: annualIncome ?? 0,
    tax_withheld: taxWithheld ?? 0,
  };

  const result = calculateIncomeTax(input);

  let buffer;
  try {
    buffer = await renderToBuffer(
      <IncomeTaxPdf
        values={result}
        input={input}
        id={id}
        createdAt={new Date()}
      />
    );
  } catch (error) {
    Logger.error("saveIncomeTax", "Error rendering PDF: " + JSON.stringify(error));
  }

  try {
    await prisma.logEvent.createMany({
      data: [
        {
          type: 'SAVED_PDF',
          userId: id,
          data: input,
        },
        {
          type: 'GENERATE_INCOME_TAX_CALCULATION',
          userId: id,
          data: input,
        }
      ]
    });
  } catch (error) {
    Logger.error("saveIncomeTax", "Error saving log event: " + JSON.stringify(error));
  }

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="income_tax_${(new Date()).toUTCString()}.pdf"`,
    },
  });
}
