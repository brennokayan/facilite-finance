// PaginaPainelDeControle.tsx
import { useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import { useUser } from "../../hooks/userHooks";
import ComponenteNavBar from "../../components/navBar";
import useSWR from "swr";
import lucrosService from "../../service/lucrosService";
import gastosService from "../../service/gastosService";
import { getDefaultDates, CalcFinalValue } from "../../utils/defaultFunctions";
import { FilterControls, FilterOptions } from "../../components/filterComponet";
import { CompoenenteCardDashboard } from "./components/cardDashboard";


// // Função para agregar os dados por mês (formato "MM/YYYY")
// function aggregateByMonth(data: { valor: number; criadoEm: string }[]) {
//   const aggregated: Record<string, number> = {};
//   data.forEach((item) => {
//     const date = new Date(item.criadoEm);
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     const key = `${month < 10 ? "0" + month : month}/${year}`;
//     aggregated[key] = (aggregated[key] || 0) + item.valor;
//   });
//   const entries = Object.entries(aggregated).map(([mes, valor]) => ({ mes, valor }));
//   // Ordena cronologicamente (assumindo que as chaves estão no formato MM/YYYY)
//   entries.sort((a, b) => {
//     const [mA, yA] = a.mes.split("/").map(Number);
//     const [mB, yB] = b.mes.split("/").map(Number);
//     return yA === yB ? mA - mB : yA - yB;
//   });
//   return entries;
// }

export function PaginaPainelDeControle() {
  document.title = "ORCALITY - Painel de controle";
  const dataUser = useUser()?.user;
  const { dataInicio: defaultDataInicio, dataFim: defaultDataFim } = getDefaultDates();

  // Estado dos filtros (que também serão aplicados nas chamadas de lucros/gastos)
  const [filters, setFilters] = useState<FilterOptions>({
    ordem: "desc",
    field: "criadoEm",
    dataInicio: defaultDataInicio,
    dataFim: defaultDataFim,
    // Caso queira incluir filtros adicionais (por exemplo, classe), acrescente aqui.
  });

  // SWR para buscar lucros com filtros
  const {
    data: lucros,
    error: errorLucros,
    isLoading: isLoadingLucros,
  } = useSWR(["lucros", filters], async () => {
    const response = await lucrosService.getAll(filters);
    return response.data;
  });

  // SWR para buscar gastos com filtros
  const {
    data: gastos,
    error: errorGastos,
    isLoading: isLoadingGastos,
  } = useSWR(["gastos", filters], async () => {
    const response = await gastosService.getAll(filters);
    return response.data;
  });

  // Agrega os dados mensais para os gráficos
  // const lucrosMonthly = useMemo(() => (lucros?.data ? aggregateByMonth(lucros.data) : []), [lucros]);
  // const gastosMonthly = useMemo(() => (gastos?.data ? aggregateByMonth(gastos.data) : []), [gastos]);

  // Exibe feedback visual caso esteja carregando ou ocorra erro
  if (isLoadingLucros || isLoadingGastos) {
    return (
      <>
        <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }
  if (errorLucros || errorGastos) {
    return (
      <>
        <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
        <Container maxWidth="lg">
          <Typography variant="h6" color="error">
            Erro ao carregar dados. Tente novamente mais tarde.
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        {/* Filtros dinâmicos */}
        <Box sx={{ my: 2 }}>
          <FilterControls filters={filters} onChange={setFilters} />
        </Box>

        {/* Cards de resumo */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            pt: 2,
          }}
        >
          <CompoenenteCardDashboard
            icone={
              <Box sx={{ color: (theme) => theme.palette.secondary.main }}>
                {/* Ícone ou componente gráfico para classes */}
                <span>🏷️</span>
              </Box>
            }
            tipo="CLASSE-LANCAMENTO"
            titulo="Classes de Lançamento"
            valor={0}
          />
          <CompoenenteCardDashboard
            icone={
              <Box sx={{ color: (theme) => theme.palette.primary.main }}>
                <span>💰</span>
              </Box>
            }
            tipo="LUCROS"
            titulo="Lucros"
            valor={CalcFinalValue(lucros?.data.map((item) => item.valor))}
          />
          <CompoenenteCardDashboard
            icone={
              <Box sx={{ color: (theme) => theme.palette.error.main }}>
                <span>💸</span>
              </Box>
            }
            tipo="GASTOS"
            titulo="Gastos"
            valor={CalcFinalValue(gastos?.data.map((item) => item.valor))}
          />
        </Box>

        {/* Gráficos dinâmicos
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            my: 4,
          }}
        >
          <ComponenteGraficoDashboard
            titulo="Gráfico de Lucros"
            XDataKey="mes"
            BarDataKey="valor"
            corBarra="primary"
            data={lucrosMonthly}
          />
          <ComponenteGraficoDashboard
            titulo="Gráfico de Gastos"
            XDataKey="mes"
            BarDataKey="valor"
            corBarra="error"
            data={gastosMonthly}
          />
        </Box> */}
      </Container>
    </>
  );
}
