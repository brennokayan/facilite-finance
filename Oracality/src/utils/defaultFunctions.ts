export function isValidCUID(token: string): boolean {
  const cuidRegex = /^c[a-z0-9]{24}$/;
  return cuidRegex.test(token);
}
export function ToBRL(value: number) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

