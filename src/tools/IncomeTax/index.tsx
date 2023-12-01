"use client";
import TabContainer from "@/components/dashboard/tabs/TabContainer";
import Title from "@/components/shared/Title";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPercentage, minClamp, parseToEuro, parseToNumber } from "@/lib/money";
import { cn } from "@/lib/utils";
import translations from "@/translations/getTranslation";
import React from "react";
import { create } from "zustand";
import { yearlyIncomeTaxValues } from "./values";

export const ResultRow = ({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value: number;
  className?: string;
  valueClassName?: string;
}) => {
  return (
    <li className={cn("flex justify-between items-center", className)}>
      <span className="text-lg">{label}</span>{" "}
      <span className={cn("font-serif text-2xl", valueClassName)}>
        {parseToEuro(value)}
      </span>
    </li>
  );
};

export const NumberInput: React.FC<{
  name: string;
  text: {
    label?: string;
    placeholder?: string;
    description?: string;
  };
  defaultValue?: number;
  onChange?: (value: number) => void;
  value?: number;
  className?: string;
}> = ({
  name,
  text,
  defaultValue,
  className,
  value,
  onChange = () => { },
}) => {
    return (
      <div className={cn("w-full pb-1", className)}>
        <Label htmlFor={name} className="text-md">
          {text.label}
        </Label>
        <Input
          type="number"
          placeholder={text.placeholder}
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(parseToNumber(e.target.value))}
        />
        <p className="font-serif font-bold text-sm">{text.description}</p>
      </div>
    );
  };

export const CheckBoxInput: React.FC<{
  name: string;
  text: {
    question: string;
    description?: string;
  };
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  value?: boolean;
  className?: string;
}> = ({
  name,
  text,
  defaultValue,
  className,
  value,
  onChange = () => { },
}) => {
    return (
      <div className={cn("items-start flex space-x-2 pt-4", className)}>
        <Checkbox id={name} defaultChecked={defaultValue} checked={value} onCheckedChange={onChange} />
        <div>
          <label
            htmlFor={name}
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {text.question}
          </label>
          <p className="font-serif font-bold text-sm">{text.description}</p>
        </div>
      </div>
    );
  };

export const SelectInput: React.FC<{
  name: string;
  text: {
    label?: string;
    placeholder?: string;
    description?: string;
  };
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}> = ({
  name,
  text,
  options,
  defaultValue,
  className,
  value,
  onChange = () => { },
}) => {
    return (
      <div>
        <Label htmlFor={name} className="text-md">
          {text.label}
        </Label>
        <Select defaultValue={defaultValue} value={value} name={name} onValueChange={onChange}>
          <SelectTrigger className={cn(className)}>
            <SelectValue placeholder={text.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="font-serif font-bold text-sm">{text.description}</p>
      </div>
    );
  };

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
    const yearlyValues = yearlyIncomeTaxValues[year ?? "2023"];


    let business_income = minClamp(revenue, 0);

    let entrepreneur_deduction = hours_worked ? yearlyValues.entrepreneur_deduction : 0;
    if (starter_deduction) {
      entrepreneur_deduction += yearlyValues.starter_deduction;
    }

    let profit_exemption = Math.round(getPercentage(business_income - entrepreneur_deduction, yearlyValues.mkb_deduction_percentage));

    let wage = minClamp(salaried ? annual_salary : 0, 0);

    let income_tax_due = minClamp(salaried ? tax_withheld : 0, 0) * -1;

    let taxable_income = business_income - entrepreneur_deduction - profit_exemption + wage;

    let income_tax = yearlyValues.income_tax(taxable_income);

    let general_tax_credit = yearlyValues.general_tax_credit(taxable_income);

    let labor_discount = yearlyValues.labor_discount(business_income - entrepreneur_deduction);

    let tax_credits = general_tax_credit + labor_discount;

    income_tax_due += minClamp(income_tax - tax_credits, 0);

    let health_insurance = yearlyValues.health_insurance_percentage(taxable_income);

    set({
      results: {
        business_income,
        entrepreneur_deduction,
        profit_exemption,
        wage,
        taxable_income,
        income_tax,
        general_tax_credit,
        labor_discount,
        tax_credits,

        //Final
        income_tax_due,
        health_insurance,
      }
    })
  }
}))

const IncomeTax = () => {
  const store = useIncomeTaxStore();

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
            />
            <ResultRow
              label={translations.incomeTaxTool.result.profit_exemption}
              value={store.results.profit_exemption}
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
            />
            <ResultRow
              label={translations.incomeTaxTool.result.general_tax_credit}
              value={store.results.general_tax_credit}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.labor_discount}
              value={store.results.labor_discount}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.tax_credits}
              value={store.results.tax_credits}
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
            />
          </ul>
        </div>
      </div>
    </TabContainer>
  );
};

export default IncomeTax;
