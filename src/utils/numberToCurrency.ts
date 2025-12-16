export function numberToCurrency(value: number, removeSimbol = false) {
  const result = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  if (removeSimbol) {
    return result.replace("R$", "");
  }

  return removeSimbol ? result.replace("R$", "") : result;
}
