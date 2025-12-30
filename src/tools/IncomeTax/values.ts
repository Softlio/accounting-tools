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

export const yearlyIncomeTaxValues: YearlyIncomeTaxValues = {
  "2026": {
    entrepreneur_deduction: 1200,
    mkb_deduction_percentage: 12.7,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 38883, percentage: 35.75 },
        { max: 78426, percentage: 37.56 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(3115 - getPercentage(value, 6.398) - 29736, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 29736, value: 3115 },
        { min: 29736, max: 78426, value: midClass },
        { min: 78426, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        {
          min: 0,
          max: 11965,
          value: getPercentage(value, 8.324),
        },
        {
          min: 11965,
          max: 25845,
          value: 996 + getPercentage(value - 11965, 31.009),
        },
        {
          min: 25845,
          max: 45592,
          value: 5300 + getPercentage(value - 25845, 1.95),
        },
        {
          min: 45592,
          max: 132920,
          value: 5685 - getPercentage(value - 45592, 6.51),
        },
        {
          min: 132920,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 4.85, 79412);
    },
    entrepreneur_deduction_link:
      "https://ondernemersplein.overheid.nl/subsidies-en-regelingen/zelfstandigenaftrek/",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.rijksoverheid.nl/actueel/nieuws/2025/09/16/belastingplan-2026-stappen-naar-een-beter-belastingstelsel",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/startersaftrek",
  },
  "2025": {
    entrepreneur_deduction: 2470,
    mkb_deduction_percentage: 12.7,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 38441, percentage: 35.82 },
        { max: 76817, percentage: 37.48 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(3068 - getPercentage(value, 6.337) - 28406, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 28406, value: 3068 },
        { min: 28406, max: 76817, value: midClass },
        { min: 76817, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        { min: 0, max: 12169, value: getPercentage(value, 8.053) },
        {
          min: 12169,
          max: 26288,
          value: 980 + getPercentage(value - 12169, 30.03),
        },
        {
          min: 26288,
          max: 43071,
          value: 5220 + getPercentage(value - 26288, 2.258),
        },

        {
          min: 43071,
          max: 129078,
          value: 5599 - getPercentage(value - 43071, 6.51),
        },
        {
          min: 129078,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 5.26, 75860);
    },
    entrepreneur_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/ondernemersaftrek",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2025",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2025",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/content/wanneer-heb-ik-recht-op-de-startersaftrek",
  },
  "2024": {
    entrepreneur_deduction: 3750,
    mkb_deduction_percentage: 13.31,
    starter_deduction: 2123,
    income_tax: (value: number) => {
      const brackets: Bracket[] = [
        { max: 75518, percentage: 36.97 },
        { max: Infinity, percentage: 49.5 },
      ];

      return calculateWithMaxBracket(value, brackets);
    },
    general_tax_credit: (value: number) => {
      const midClass = minClamp(3362 - getPercentage(value, 6.63) - 24812, 0);
      const ranges: ValueRange[] = [
        { min: 0, max: 24813, value: 3362 },
        { min: 24813, max: 75518, value: midClass },
        { min: 75518, max: Infinity, value: 0 },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    labor_discount: (value: number) => {
      const ranges: ValueRange[] = [
        { min: 0, max: 11491, value: getPercentage(value, 8.425) },
        {
          min: 11491,
          max: 24821,
          value: 968 + getPercentage(value - 11490, 31.433),
        },
        {
          min: 24821,
          max: 39958,
          value: 5158 + getPercentage(value - 24820, 2.471),
        },
        {
          min: 39958,
          max: 124935,
          value: 5532 - getPercentage(value - 39957, 6.51),
        },
        {
          min: 124935,
          max: Infinity,
          value: 0,
        },
      ];

      return getValueBetweenMultiRangesMinMax(value, ranges);
    },
    health_insurance_percentage: (value) => {
      return calculatePercentageWithMax(value, 5.32, 71624);
    },
    entrepreneur_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/ondernemersaftrek/ondernemersaftrek",
    mkb_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/mkb_winstvrijstelling",
    income_tax_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/",
    general_tax_credit_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2024",
    labor_discount_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2024",
    health_insurance_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/bijdrage_zorgverzekeringswet/inkomensafhankelijke_bijdrage_zorgverzekeringswet",
    starter_deduction_link:
      "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/content/wanneer-heb-ik-recht-op-de-startersaftrek",
  },
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

export const availableYears = Object.keys(yearlyIncomeTaxValues).reverse();
