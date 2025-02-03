import { Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";

export function PaginaLucros() {
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <h1>Lucros</h1>
      </Container>
    </>
  );
}
