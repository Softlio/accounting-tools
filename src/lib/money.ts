export const parseToEuro = (value: number): string => {
  if (value === 0) {
    return "€ 0";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};
