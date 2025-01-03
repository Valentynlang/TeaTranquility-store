export function formatCurrency(amount: number, currency: string = "USD") : string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase()
    }).format(amount);
  } catch (error) {
    console.error(`Error formatting currency: ${error}`);
    return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  }
}
