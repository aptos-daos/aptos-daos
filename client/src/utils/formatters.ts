const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value}%`;
};

export { formatNumber, formatCurrency, formatPercentage };
