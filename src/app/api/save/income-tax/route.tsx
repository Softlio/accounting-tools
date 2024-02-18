import { calculateIncomeTax } from "@/lib/calculate-income-tax";
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

  const buffer = await renderToBuffer(
    <IncomeTaxPdf
      values={result}
      input={input}
      id={id}
      createdAt={new Date()}
    />
  );


  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="income_tax_${(new Date()).toUTCString()}.pdf"`,
    },
  });
}
