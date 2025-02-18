import { Container } from "@mui/material";
import { ComponenteContainerCardDashboard } from "./components/containerCardDashboard";
import { ComponenteContainerGraficosDashboard } from "./components/containerGraficosDashboard";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";

export function PaginaPainelDeControle() {
  document.title = "ORCALITY - Painel de controle";
  const dataUser = useUser()?.user;
  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <ComponenteContainerCardDashboard />
        <ComponenteContainerGraficosDashboard />
      </Container>
    </>
  );
}
