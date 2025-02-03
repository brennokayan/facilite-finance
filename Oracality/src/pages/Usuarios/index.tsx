import { Box, Button, Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";

export function PaginaUsuarios() {
  document.title = "ORCALITY - Usuários";
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginY: 2,
          }}
        >
          <Button
            onClick={() => {
              alert("Cadastrar usuário");
            }}
            variant="contained"
            color="primary"
          >
            Cadastrar Usuário
          </Button>
        </Box>
      </Container>
    </>
  );
}
