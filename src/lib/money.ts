export const parseToEuro = (value: number, negative?: boolean): string => {
  if (value === 0) {
    return `${negative ? "-" : ""} € 0`;
  }

  const result = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

  return `${negative ? "-" : ""} ${result}`;
};

export const minClamp = (value: number, min: number = 0): number => {
  return Math.max(value, min);
};

export const parseToNumber = (value: any): number => {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) {
    return 0;
  }

  return floatValue;
};

export const getPercentage = (value: number, percentage: number): number => {
  return value * (percentage / 100);
};

export type Bracket = { max: number; percentage: number };

export const calculateWithMaxBracket = (
  value: number,
  brackets: Bracket[]
): number => {
  for (const bracket of brackets) {
    if (value <= bracket.max) {
      return getPercentage(value, bracket.percentage);
    }
  }

  return 0;
};

export type ValueRange = { min: number; max: number; value: number };

export const getValueBetweenMultiRangesMinMax = (
  value: number,
  ranges: ValueRange[]
): number => {
  for (const range of ranges) {
    if (value >= range.min && value <= range.max) {
      return range.value;
    }
  }

  return 0;
};

export const calculatePercentageWithMax = (
  value: number,
  percentage: number,
  max: number
): number => {
  return getPercentage(Math.min(value, max), percentage);
};
