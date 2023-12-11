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


    const buffer = await renderToBuffer(
      <IncomeTaxPdf />,
    );

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="income_tax_${incomeTaxCalculation.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error while generating income tax pdf");
    return new NextResponse("Internal server error", { status: 500 });
  }
}

