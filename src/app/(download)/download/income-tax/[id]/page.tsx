import DownloadButton from "@/components/downloads/DownloadButton";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const IncomeTaxNotPaid: React.FC<{
    paymentUrl: string | null;
}> = ({
    paymentUrl,
}) => {
        return <section className="py-12">
            <div className="container mx-auto text-center flex justify-center flex-col items-center gap-8 px-2">
                <div className=" space-y-2">
                    <Title type="h1">
                        {translations.downloadPages.incomeTax.notPaid.title}
                    </Title>
                    <p className="text-lg max-w-xl">
                        {translations.downloadPages.incomeTax.notPaid.description}
                    </p>
                </div>

                <div className="space-y-2">
                    {
                        paymentUrl && (
                            <Link passHref href={paymentUrl}>
                                <Button className=" hover:bg-theme-secondary">
                                    {translations.downloadPages.incomeTax.notPaid.payNow}
                                </Button>
                            </Link>
                        )
                    }

                    <div className="flex items-center justify-center">
                        <a href="/" className="underline text-xl font-serif text-theme-dark hover:text-theme-secondary cursor-pointer w-min whitespace-nowrap">
                            {translations.downloadPages.goBack}
                        </a>
                    </div>
                </div>

            </div>
        </section>;
    };

const IncomeTaxDownload: React.FC<{
    params: {
        id: string;
    };
}> = async ({ params }) => {
    if (!params.id) {
        return notFound();
    }

    try {
        const incomeTaxCalculation = await prisma.incomeTaxCalculation.findUnique({
            where: {
                id: params.id,
            },
            include: {
                payment: true,
            },
        });

        if (!incomeTaxCalculation) {
            return notFound();
        }

        if (!["paid", "open"].includes(incomeTaxCalculation.payment.status ?? "")) {
            return notFound();
        }

        if (incomeTaxCalculation.payment.status === "open") {
            return <IncomeTaxNotPaid paymentUrl={incomeTaxCalculation.payment.checkoutUrl} />;
        }

        return <section className="py-12">
            <div className="container mx-auto flex flex-col gap-8 items-center justify-center text-center py-2">

                <Image src={"/images/income-tax.webp"} width={250} height={250} alt={"Product image"} />

                <div className="gap-2 flex flex-col items-center justify-center">
                    <Title type="h1">
                        {translations.downloadPages.incomeTax.paid.title}
                    </Title>
                    <p className="text-lg max-w-xl">
                        {translations.downloadPages.incomeTax.paid.description}
                    </p>
                </div>

                <DownloadButton link={`/api/download/income-tax/${params.id}`} />

                <div className="flex items-center justify-center">
                    <a href="/" className="underline text-xl font-serif text-theme-dark hover:text-theme-secondary cursor-pointer w-min whitespace-nowrap">
                        {translations.downloadPages.goBack}
                    </a>
                </div>

            </div>
        </section>;
    } catch (error) {
        console.error(error);
        return notFound();
    }
};

export default IncomeTaxDownload;
