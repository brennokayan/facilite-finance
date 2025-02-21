// PaginaPainelDeControle.tsx
import { useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import { useUser } from "../../hooks/userHooks";
import ComponenteNavBar from "../../components/navBar";
import useSWR from "swr";
import lucrosService from "../../service/lucrosService";
import gastosService from "../../service/gastosService";
import { getDefaultDates } from "../../utils/defaultFunctions";
import { FilterControls, FilterOptions } from "../../components/filterComponet";
import { ComponenteContainerCardDashboard } from "./components/containerCardDashboard";

export function PaginaPainelDeControle() {
  document.title = "ORCALITY - Painel de controle";
  const dataUser = useUser()?.user;
  const { dataInicio: defaultDataInicio, dataFim: defaultDataFim } =
    getDefaultDates();

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



  // Exibe feedback visual caso esteja carregando ou ocorra erro
  if (isLoadingLucros || isLoadingGastos) {
    return (
      <>
        <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
          >
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
        <ComponenteContainerCardDashboard gastos={gastos} lucros={lucros} />
      </Container>
    </>
  );
}
