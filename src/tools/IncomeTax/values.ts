import {
  Bracket,
  ValueRange,
  calculatePercentageWithMax,
  calculateWithMaxBracket,
  getPercentage,
  getValueBetweenMultiRangesMinMax,
  minClamp,
} from "@/lib/money";

type YearlyIncomeTaxValues = {
  [year: string]: {
    entrepreneur_deduction: number;
    mkb_deduction_percentage: number;
    starter_deduction: number;
    income_tax: (value: number) => number;
    general_tax_credit: (value: number) => number;
    labor_discount: (value: number) => number;
    health_insurance_percentage: (value: number) => number;
    //Links
    entrepreneur_deduction_link: string;
    mkb_deduction_link: string;
    income_tax_link: string;
    general_tax_credit_link: string;
    labor_discount_link: string;
    health_insurance_link: string;
    starter_deduction_link: string;
  };
};

//TODO: Add 2024 values

export const yearlyIncomeTaxValues: YearlyIncomeTaxValues = {
  "2023": {
    entrepreneur_deduction: 5030,
    mkb_deduction_percentage: 14,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 73032, percentage: 36.93 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(3070 - getPercentage(value, 6.095) - 22660, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 22661, value: 3070 },
        { min: 22661, max: 73031, value: midClass },
        { min: 73031, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        { min: 0, max: 10741, value: getPercentage(value, 8.231) },
        {
          min: 10741,
          max: 23201,
          value: 884 + getPercentage(value - 10740, 29.861),
        },
        {
          min: 23201,
          max: 37691,
          value: 4605 + getPercentage(value - 23201, 3.085),
        },
        {
          min: 37691,
          max: 115295,
          value: 5052 - getPercentage(value - 37691, 6.51),
        },
        {
          min: 115295,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 5.43, 66952);
    },
    entrepreneur_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/ondernemersaftrek",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2023",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2023",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/content/wanneer-heb-ik-recht-op-de-startersaftrek",
  },
  "2022": {
    entrepreneur_deduction: 6310,
    mkb_deduction_percentage: 14,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 69399, percentage: 37.07 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(2888 - getPercentage(value, 6.007) - 21317, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 21318, value: 2888 },
        { min: 21318, max: 69398, value: midClass },
        { min: 69398, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        {
          min: 0,
          max: 10351,
          value: minClamp(getPercentage(value, 4.541), 0),
        },
        {
          min: 10351,
          max: 22357,
          value: 470 + getPercentage(value - 10350, 28.461),
        },
        {
          min: 22357,
          max: 36650,
          value: 3887 + getPercentage(value - 22356, 2.61),
        },
        {
          min: 36650,
          max: 109347,
          value: 4260 - getPercentage(value - 36649, 5.86),
        },
        {
          min: 109347,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 5.5, 59706);
    },
    entrepreneur_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/ondernemersaftrek",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2022",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2022",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/content/wanneer-heb-ik-recht-op-de-startersaftrek",
  },
  "2021": {
    entrepreneur_deduction: 6670,
    mkb_deduction_percentage: 14,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 68508, percentage: 37.1 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(2837 - getPercentage(value, 5.977) - 21043, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 21044, value: 2837 },
        { min: 21044, max: 68507, value: midClass },
        { min: 68507, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        {
          min: 0,
          max: 10109,
          value: minClamp(getPercentage(value, 4.581), 0),
        },
        {
          min: 10109,
          max: 21836,
          value: 463 + getPercentage(value - 10108, 28.771),
        },
        {
          min: 21836,
          max: 35653,
          value: 3837 + getPercentage(value - 21835, 2.663),
        },
        {
          min: 35653,
          max: 105737,
          value: 4205 - getPercentage(value - 35652, 6),
        },
        {
          min: 105737,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 5.75, 58311);
    },
    entrepreneur_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/ondernemersaftrek",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2021",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2021",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/content/wanneer-heb-ik-recht-op-de-startersaftrek",
  },
} as const;
