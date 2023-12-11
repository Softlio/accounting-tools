import { yearlyIncomeTaxValues } from "@/tools/IncomeTax/values";
import { getPercentage, minClamp } from "./money";

export interface IncomeTaxResultValues {
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

interface Props {
  revenue: number;
  year: string;
  hours_worked: boolean;
  starter_deduction: boolean;
  annual_salary: number;
  tax_withheld: number;
  salaried: boolean;
}

export const calculateIncomeTax = ({
  revenue,
  year,
  hours_worked,
  starter_deduction,
  annual_salary,
  tax_withheld,
  salaried,
}: Props): IncomeTaxResultValues => {
  const yearlyValues = yearlyIncomeTaxValues[year ?? "2023"];

  let business_income = minClamp(revenue, 0);

  let entrepreneur_deduction = hours_worked
    ? yearlyValues.entrepreneur_deduction
    : 0;
  if (starter_deduction) {
    entrepreneur_deduction += yearlyValues.starter_deduction;
  }

  let profit_exemption = Math.round(
    getPercentage(
      business_income - entrepreneur_deduction,
      yearlyValues.mkb_deduction_percentage
    )
  );

  let wage = minClamp(salaried ? annual_salary : 0, 0);

  let income_tax_due = minClamp(salaried ? tax_withheld : 0, 0) * -1;

  let taxable_income =
    business_income - entrepreneur_deduction - profit_exemption + wage;

  let income_tax = yearlyValues.income_tax(taxable_income);

  let general_tax_credit = yearlyValues.general_tax_credit(taxable_income);

  let labor_discount = yearlyValues.labor_discount(
    business_income - entrepreneur_deduction
  );

  let tax_credits = general_tax_credit + labor_discount;

  income_tax_due += minClamp(income_tax - tax_credits, 0);

  let health_insurance =
    yearlyValues.health_insurance_percentage(taxable_income);

  return {
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

    //Links
    entrepreneur_deduction_link: yearlyValues.entrepreneur_deduction_link,
    mkb_deduction_link: yearlyValues.mkb_deduction_link,
    income_tax_link: yearlyValues.income_tax_link,
    general_tax_credit_link: yearlyValues.general_tax_credit_link,
    labor_discount_link: yearlyValues.labor_discount_link,
    health_insurance_link: yearlyValues.health_insurance_link,
    starter_deduction_link: yearlyValues.starter_deduction_link,
  };
};
