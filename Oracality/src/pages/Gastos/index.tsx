import { Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";

export function PaginaGastos() {
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <h1>Gastos</h1>
      </Container>
    </>
  );
}
