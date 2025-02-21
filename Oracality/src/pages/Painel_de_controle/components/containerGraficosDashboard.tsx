//containerGraficosDashboard.tsx

import { Box } from "@mui/material";
import { ComponenteGraficoDashboard } from "./graficoDashboard";

export function ComponenteContainerGraficosDashboard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          gap: 2,
          marginTop: 4,
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <ComponenteGraficoDashboard
          key={1}
          BarDataKey="valor"
          XDataKey="mes"
          corBarra="green"
          data={[
            { mes: "01/24", valor: 1000 },
            { mes: "02/24", valor: 2000 },
            { mes: "03/24", valor: 3000 },
            { mes: "04/24", valor: 4000 },
            { mes: "05/24", valor: 5000 },
            { mes: "06/24", valor: 6000 },
            { mes: "07/24", valor: 7000 },
            { mes: "08/24", valor: 8000 },
            { mes: "09/24", valor: 9000 },
            { mes: "10/24", valor: 10000 },
            { mes: "11/24", valor: 11000 },
            { mes: "12/24", valor: 12000 },
          ]}
          titulo="Gráfico de Lucros"
        />
        <ComponenteGraficoDashboard
          key={1}
          BarDataKey="valor"
          XDataKey="mes"
          corBarra={"red"}
          data={[
            { mes: "01/24", valor: 1000 },
            { mes: "02/24", valor: 2000 },
            { mes: "03/24", valor: 3000 },
            { mes: "04/24", valor: 4000 },
            { mes: "05/24", valor: 5000 },
            { mes: "06/24", valor: 6000 },
            { mes: "07/24", valor: 7000 },
            { mes: "08/24", valor: 8000 },
            { mes: "09/24", valor: 9000 },
            { mes: "10/24", valor: 10000 },
            { mes: "11/24", valor: 11000 },
            { mes: "12/24", valor: 12000 },
          ]}
          titulo="Gráfico de Gastos"
        />
      </Box>
    </>
  );
}
