"use client";
import TabContainer from "@/components/dashboard/tabs/TabContainer";
import Title from "@/components/shared/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { parseToEuro } from "@/lib/money";
import { cn } from "@/lib/utils";

import translations from "@/translations/getTranslation";

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
  defaultValue = 0,
  className = "",
  value = 0,
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
  defaultValue = false,
  className = "",
  value = false,
  onChange = () => { },
}) => {
    return (
      <div className={cn("items-start flex space-x-2 pt-4", className)}>
        <Checkbox id={name} defaultChecked={defaultValue} />
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
  defaultValue = "",
  className = "",
  value = "",
  onChange = () => { },
}) => {
    return (
      <div>
        <Label htmlFor={name} className="text-md">
          {text.label}
        </Label>
        <Select defaultValue={defaultValue} name={name}>
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

const IncomeTax = () => {
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
            />
            <SelectInput
              name="year"
              text={translations.incomeTaxTool.details.form.year}
              defaultValue="2023"
              className="w-[180px]"
              options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
              ]}
            />
          </div>

          <CheckBoxInput
            name="hours_worked"
            text={translations.incomeTaxTool.details.form.hours_worked}
          />
          <CheckBoxInput
            name="starter_deduction"
            text={translations.incomeTaxTool.details.form.starter_deduction}
          />
          <CheckBoxInput
            name="salaried"
            text={translations.incomeTaxTool.details.form.salaried}
          />
          <NumberInput
            name="annual_salary"
            text={translations.incomeTaxTool.details.form.annual_salary}
            defaultValue={0}
            className="w-3/5 pt-6"
          />
          <NumberInput
            name="tax_withheld"
            text={translations.incomeTaxTool.details.form.tax_withheld}
            defaultValue={0}
            className="w-3/5"
          />
        </div>
        <div className="max-w-xl space-y-2">
          <Title type="h4">{translations.incomeTaxTool.result.title}</Title>
          <ul className="px-2 flex flex-col gap-1">
            <ResultRow
              label={translations.incomeTaxTool.result.business_income}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.entrepreneur_deduction}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.profit_exemption}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.wage}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.taxable_income}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.income_tax}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.general_tax_credit}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.labor_discount}
              value={0}
            />
            <ResultRow
              label={translations.incomeTaxTool.result.tax_credits}
              value={0}
            />
            <hr className=" my-2 border-theme-secondary" />
            <ResultRow
              className={"font-bold"}
              label={translations.incomeTaxTool.result.income_tax_due}
              value={0}
            />
            <ResultRow
              className={"font-bold"}
              label={translations.incomeTaxTool.result.health_insurance}
              value={0}
            />
          </ul>
        </div>
      </div>
    </TabContainer>
  );
};

export default IncomeTax;
