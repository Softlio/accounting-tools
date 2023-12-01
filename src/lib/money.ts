export const parseToEuro = (value: number): string => {
  if (value === 0) {
    return "€ 0";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export const minClamp = (value: number, min: number = 0): number => {
  return Math.max(value, min);
};
