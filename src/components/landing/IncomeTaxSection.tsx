"use client";
import Title from "@/components/shared/Title";
import { CheckBoxInput } from "@/components/tools/CheckboxInput";
import { NumberInput } from "@/components/tools/NumberInput";
import { ResultRow } from "@/components/tools/ResultRow";
import { SelectInput } from "@/components/tools/SelectInput";
import {
    Card,
} from "@/components/ui/card";
import translations from "@/translations/getTranslation";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { Button } from "../ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IncomeTaxResultValues, calculateIncomeTax } from "@/lib/calculate-income-tax";
import toast from "react-hot-toast";
import { Input } from "../ui/input";



interface IncomeTaxState {
    revenue: number;
    year: string;
    hours_worked: boolean;
    starter_deduction: boolean;
    annual_salary: number;
    tax_withheld: number;
    salaried: boolean;
    results: IncomeTaxResultValues;

    //Setters
    setRevenue: (value: number) => void;
    setYear: (value: string) => void;
    setHoursWorked: (value: boolean) => void;
    setStarterDeduction: (value: boolean) => void;
    setAnnualSalary: (value: number) => void;
    setTaxWithheld: (value: number) => void;
    setSalaried: (value: boolean) => void;

    //Calculations
    calculate: () => void;
}

const useIncomeTaxStore = create<IncomeTaxState>()((set, get) => ({
    //Values
    revenue: 0,
    year: "2023",
    hours_worked: false,
    starter_deduction: false,
    annual_salary: 0,
    tax_withheld: 0,
    salaried: false,
    results: {
        business_income: 0,
        entrepreneur_deduction: 0,
        profit_exemption: 0,
        wage: 0,
        taxable_income: 0,
        income_tax: 0,
        general_tax_credit: 0,
        labor_discount: 0,
        tax_credits: 0,
        income_tax_due: 0,
        health_insurance: 0,
        entrepreneur_deduction_link: "",
        mkb_deduction_link: "",
        income_tax_link: "",
        general_tax_credit_link: "",
        labor_discount_link: "",
        health_insurance_link: "",
        starter_deduction_link: "",
    },

    //Setters
    setSalaried: (value) => {
        set({ salaried: value });
        get().calculate();
    },
    setRevenue: (value) => {
        set({ revenue: value });
        get().calculate();
    },
    setYear: (value) => {
        set({ year: value });
        get().calculate();
    },
    setHoursWorked: (value) => {
        set({ hours_worked: value });
        get().calculate();
    },
    setStarterDeduction: (value) => {
        set({ starter_deduction: value });
        get().calculate();
    },
    setAnnualSalary: (value) => {
        set({ annual_salary: value });
        get().calculate();
    },
    setTaxWithheld: (value) => {
        set({ tax_withheld: value });
        get().calculate();
    },

    //Calculations
    calculate: () => {
        const {
            revenue,
            year,
            hours_worked,
            starter_deduction,
            annual_salary,
            tax_withheld,
            salaried,
        } = get();

        const results = calculateIncomeTax({
            revenue,
            year,
            hours_worked,
            starter_deduction,
            annual_salary,
            tax_withheld,
            salaried,
        });

        set({
            results: results,
        });
    },
}));

const IncomeTaxSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState("")
    const store = useIncomeTaxStore();

    useEffect(() => {
        store.calculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const order = async () => {
        if (isSubmitting) return

        if (store.revenue <= 0 || store.revenue > 10000000000) {
            toast.error(translations.incomeTaxTool.dialog.error_revenue);
            return;
        }

        if (!email) {
            toast.error(translations.incomeTaxTool.dialog.error_email);
            return;
        }

        setIsSubmitting(true)
        const res = await fetch("/api/order/new/income-tax", {
            method: "POST",
            body: JSON.stringify({
                revenue: store.revenue,
                year: store.year,
                workedMoreThan1225Hours: store.hours_worked,
                eligibleForStarterDeduction: store.starter_deduction,
                hadSalariedEmployment: store.salaried,
                annualIncome: store.annual_salary,
                taxWithheld: store.tax_withheld,
                email,
            }),
        });

        setIsSubmitting(false)
        if (res.ok) {
            const { url } = await res.json();
            window.location.replace(url);
            return;
        }
        toast.error(translations.incomeTaxTool.dialog.error);
    }

    return (
        <section id="inkomsten-belasting" className="py-16 px-4 flex flex-col gap-8">
            <div className="container mx-auto flex flex-col gap-2">
                <Title type="h2" className="text-4xl leading-none">{translations.incomeTaxTool.title}</Title>
                <p className="max-w-3xl">{translations.incomeTaxTool.description}</p>
            </div>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="max-w-xl space-y-2 p-6 rounded-none">
                        <Title type="h4">{translations.incomeTaxTool.details.title}</Title>

                        <div className="flex gap-3 w-full">
                            <NumberInput
                                name="revenue"
                                text={translations.incomeTaxTool.details.form.revenue}
                                defaultValue={0}
                                max={10000000000}
                                onChange={store.setRevenue}
                            />
                            <SelectInput
                                name="year"
                                text={translations.incomeTaxTool.details.form.year}
                                className="w-[180px]"
                                options={[
                                    { label: "2023", value: "2023" },
                                    { label: "2022", value: "2022" },
                                    { label: "2021", value: "2021" },
                                ]}
                                value={store.year}
                                onChange={store.setYear}
                            />
                        </div>

                        <CheckBoxInput
                            name="hours_worked"
                            text={translations.incomeTaxTool.details.form.hours_worked}
                            value={store.hours_worked}
                            onChange={store.setHoursWorked}
                        />
                        <CheckBoxInput
                            name="starter_deduction"
                            text={translations.incomeTaxTool.details.form.starter_deduction}
                            value={store.starter_deduction}
                            onChange={store.setStarterDeduction}
                            infoLabel={{
                                read_more: store.results.starter_deduction_link,
                                description: translations.incomeTaxTool.info.starter_deduction,
                            }}
                        />
                        <CheckBoxInput
                            name="salaried"
                            text={translations.incomeTaxTool.details.form.salaried}
                            value={store.salaried}
                            onChange={store.setSalaried}
                        />
                        {store.salaried && (
                            <>
                                <NumberInput
                                    name="annual_salary"
                                    text={translations.incomeTaxTool.details.form.annual_salary}
                                    className="w-3/5 pt-6"
                                    defaultValue={store.annual_salary}
                                    onChange={store.setAnnualSalary}
                                />
                                <NumberInput
                                    name="tax_withheld"
                                    text={translations.incomeTaxTool.details.form.tax_withheld}
                                    className="w-3/5"
                                    defaultValue={store.tax_withheld}
                                    onChange={store.setTaxWithheld}
                                />
                            </>
                        )}
                    </Card>
                    <Card className="max-w-xl flex flex-col gap-2 p-6 rounded-none">
                        <Title type="h4">{translations.incomeTaxTool.result.title}</Title>
                        <ul className="px-2 flex flex-col gap-1">
                            <ResultRow
                                label={translations.incomeTaxTool.result.business_income}
                                value={store.results.business_income}
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.entrepreneur_deduction}
                                value={store.results.entrepreneur_deduction}
                                negative
                                infoLabel={{
                                    read_more: store.results.entrepreneur_deduction_link,
                                    description:
                                        translations.incomeTaxTool.info.entrepreneur_deduction,
                                }}
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.profit_exemption}
                                value={store.results.profit_exemption}
                                negative
                                infoLabel={{
                                    read_more: store.results.mkb_deduction_link,
                                    description: translations.incomeTaxTool.info.mkb_deduction,
                                }}
                                obfuscate
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.wage}
                                value={store.results.wage}
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.taxable_income}
                                value={store.results.taxable_income}
                                obfuscate
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.income_tax}
                                value={store.results.income_tax}
                                infoLabel={{
                                    read_more: store.results.income_tax_link,
                                    description: translations.incomeTaxTool.info.income_tax,
                                }}
                                obfuscate
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.general_tax_credit}
                                value={store.results.general_tax_credit}
                                infoLabel={{
                                    read_more: store.results.general_tax_credit_link,
                                    description:
                                        translations.incomeTaxTool.info.general_tax_credit,
                                }}
                                negative
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.labor_discount}
                                value={store.results.labor_discount}
                                infoLabel={{
                                    read_more: store.results.labor_discount_link,
                                    description: translations.incomeTaxTool.info.labor_discount,
                                }}
                            />
                            <ResultRow
                                label={translations.incomeTaxTool.result.tax_credits}
                                value={store.results.tax_credits}
                                negative
                                obfuscate
                            />
                            <hr className=" my-2 border-theme-secondary" />
                            <ResultRow
                                className={"font-bold"}
                                label={translations.incomeTaxTool.result.income_tax_due}
                                value={store.results.income_tax_due}
                                obfuscate
                            />
                            <ResultRow
                                className={"font-bold"}
                                label={translations.incomeTaxTool.result.health_insurance}
                                value={store.results.health_insurance}
                                infoLabel={{
                                    read_more: store.results.health_insurance_link,
                                    description: translations.incomeTaxTool.info.health_insurance,
                                }}
                                obfuscate
                            />
                        </ul>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="text-2xl font-bold mt-8 px-8 py-6 w-full bg-theme-secondary font-serif">
                                    {translations.incomeTaxTool.result.calculate}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className=" mb-8">
                                    <DialogTitle>{translations.incomeTaxTool.dialog.title}</DialogTitle>
                                    <DialogDescription>
                                        {translations.incomeTaxTool.dialog.description}
                                    </DialogDescription>
                                </DialogHeader>
                                <Input name="email" type="email" placeholder="Email" className="w-full" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />

                                <Button className="text-2xl font-bold px-8 py-6 w-full bg-theme-secondary font-serif" onClick={order} disabled={isSubmitting} aria-disabled={isSubmitting}>
                                    {translations.incomeTaxTool.result.calculate}
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default IncomeTaxSection;
