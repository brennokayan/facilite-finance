import { Container } from "@mui/material";
import { ComponenteContainerCardDashboard } from "./components/containerCardDashboard";
import { ComponenteContainerGraficosDashboard } from "./components/containerGraficosDashboard";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";
import lucrosService from "../../service/lucrosService";
import useSWR from "swr";
import gastosService from "../../service/gastosService";

export function PaginaPainelDeControle() {
  document.title = "ORCALITY - Painel de controle";
  const dataUser = useUser()?.user;
  const {
    data: lucros,
    error: errorLucros,
    isLoading: isLoadingLucros,
  } = useSWR("lucros", async () => {
    const response = await lucrosService.getAll();
    return response.data;
  });

  const {
    data: gastos,
    error: errorGastos,
    isLoading: isLoadingGastos,
  } = useSWR("gastos", async () => {
    const response = await gastosService.getAll();
    return response.data;
  });

  if (isLoadingLucros || isLoadingGastos) return <div>Carregando...</div>;
  if (errorLucros || errorGastos) return <div>Erro ao carregar</div>;

  // const mesAtual = new Date().getMonth() + 1;
  


  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <ComponenteContainerCardDashboard gastos={gastos} lucros={lucros} />
        <ComponenteContainerGraficosDashboard />
      </Container>
    </>
  );
}
