import { Box, Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";

export function ClasseLancamento() {
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <Box>
          <h1>Classe de Lançamento</h1>
        </Box>
      </Container>
    </>
  );
}
