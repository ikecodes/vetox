export const currencyFormatter = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(amount)
}
