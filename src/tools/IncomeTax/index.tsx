"use client";
import TabContainer from "@/components/dashboard/tabs/TabContainer";
import Title from "@/components/shared/Title";
import { CheckBoxInput } from "@/components/tools/CheckboxInput";
import { NumberInput } from "@/components/tools/NumberInput";
import { ResultRow } from "@/components/tools/ResultRow";
import { SelectInput } from "@/components/tools/SelectInput";
import { calculateIncomeTax } from "@/lib/calculate-income-tax";
import translations from "@/translations/getTranslation";
import { useEffect } from "react";
import { create } from "zustand";


interface ResultValues {
  business_income: number;
  entrepreneur_deduction: number;
  profit_exemption: number;
  wage: number;
  taxable_income: number;
  income_tax: number;
  general_tax_credit: number;
  labor_discount: number;
  tax_credits: number;
  income_tax_due: number;
  health_insurance: number;

  //Info
  entrepreneur_deduction_link: string;
  mkb_deduction_link: string;
  income_tax_link: string;
  general_tax_credit_link: string;
  labor_discount_link: string;
  health_insurance_link: string;
  starter_deduction_link: string;
}

interface IncomeTaxState {
  revenue: number;
  year: string;
  hours_worked: boolean;
  starter_deduction: boolean;
  annual_salary: number;
  tax_withheld: number;
  salaried: boolean;
  results: ResultValues;

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
    set({ salaried: value })
    get().calculate();
  },
  setRevenue: (value) => {
    set({ revenue: value })
    get().calculate();
  },
  setYear: (value) => {
    set({ year: value })
    get().calculate();
  },
  setHoursWorked: (value) => {
    set({ hours_worked: value })
    get().calculate();
  },
  setStarterDeduction: (value) => {
    set({ starter_deduction: value })
    get().calculate();
  },
  setAnnualSalary: (value) => {
    set({ annual_salary: value })
    get().calculate();
  },
  setTaxWithheld: (value) => {
    set({ tax_withheld: value })
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

    const result = calculateIncomeTax({
      revenue,
      year,
      hours_worked,
      starter_deduction,
      annual_salary,
      tax_withheld,
      salaried,
    })

    set({
      results: result,
    })
  }
}))

const IncomeTax = () => {
  const store = useIncomeTaxStore();

  useEffect(() => {
    store.calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <TabContainer
      value="inkomsten-belasting"
      title={translations.incomeTaxTool.title}
    >
      <p>{translations.incomeTaxTool.description}</p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="max-w-xl space-y-2">
          <Title type="h4">{translations.incomeTaxTool.details.title}</Title>

          <div className="flex gap-3 w-full">
            <NumberInput
              name="revenue"
              text={translations.incomeTaxTool.details.form.revenue}
              defaultValue={0}
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
          {
            store.salaried && (
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
            )
          }
        </div>
        <div className="max-w-xl space-y-2">
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
                description: translations.incomeTaxTool.info.entrepreneur_deduction,
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
            />
            <ResultRow
              label={translations.incomeTaxTool.result.wage}
              value={store.results.wage}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.taxable_income}
              value={store.results.taxable_income}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.income_tax}
              value={store.results.income_tax}
              infoLabel={{
                read_more: store.results.income_tax_link,
                description: translations.incomeTaxTool.info.income_tax,
              }}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.general_tax_credit}
              value={store.results.general_tax_credit}
              infoLabel={{
                read_more: store.results.general_tax_credit_link,
                description: translations.incomeTaxTool.info.general_tax_credit,
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
              negative
            />
            <ResultRow
              label={translations.incomeTaxTool.result.tax_credits}
              value={store.results.tax_credits}
              negative
            />
            <hr className=" my-2 border-theme-secondary" />
            <ResultRow
              className={"font-bold"}
              label={translations.incomeTaxTool.result.income_tax_due}
              value={store.results.income_tax_due}
            />
            <ResultRow
              className={"font-bold"}
              label={translations.incomeTaxTool.result.health_insurance}
              value={store.results.health_insurance}
              infoLabel={{
                read_more: store.results.health_insurance_link,
                description: translations.incomeTaxTool.info.health_insurance,
              }}
            />
          </ul>
        </div>
      </div>
    </TabContainer>
  );
};

export default IncomeTax;
