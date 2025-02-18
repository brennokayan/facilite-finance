export function isValidCUID(token: string): boolean {
  const cuidRegex = /^c[a-z0-9]{24}$/;
  return cuidRegex.test(token);
}
export function ToBRL(value: number) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}


export const styleModal = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    color: "text.primary",
  };
