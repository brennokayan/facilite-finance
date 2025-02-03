import { Container } from "@mui/material";
import { ComponenteContainerCardDashboard } from "./components/containerCardDashboard";
import { ComponenteContainerGraficosDashboard } from "./components/containerGraficosDashboard";
import ComponenteNavBar from "../../components/navBar";

export function PaginaPainelDeControle() {
  document.title = "ORCALITY - Painel de controle";
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <ComponenteContainerCardDashboard />
        <ComponenteContainerGraficosDashboard />
      </Container>
    </>
  );
}
