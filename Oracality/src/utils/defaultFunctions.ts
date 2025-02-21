export function isValidCUID(token: string): boolean {
  const cuidRegex = /^c[a-z0-9]{24}$/;
  return cuidRegex.test(token);
}
export function ToBRL(value: number) {
  if (value === undefined || value === null) {
    return ""; // ou retorne "R$ 0,00" se preferir
  }
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function ToISODate(date: string) {
  const originalDate = new Date(date);

  // Subtrai 4 horas da data original (usando métodos UTC)
  originalDate.setUTCHours(originalDate.getUTCHours() - 4);

  // Extrai os componentes da data
  const day = originalDate.getUTCDate().toString().padStart(2, "0");
  const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getUTCFullYear().toString().slice(-2);
  const hours = originalDate.getUTCHours().toString().padStart(2, "0");
  const minutes = originalDate.getUTCMinutes().toString().padStart(2, "0");

  // Formata a string conforme desejado: "18/02/25 - 16:06"
  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

  return formattedDate; // Saída: "18/02/25 - 16:06"
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


export function CalcFinalValue(values: number[] | undefined): number {
  if (!values) return 0;
  return values.reduce((acc, value) => acc + value, 0);
}


// Função para obter o primeiro e o último dia do mês no formato 'YYYY-MM-DD'
export function getDefaultDates(){
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    dataInicio: firstDay.toISOString().slice(0, 10),
    dataFim: lastDay.toISOString().slice(0, 10),
  };
};