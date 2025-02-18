import { Box, Button, Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";

export function PaginaUsuarios() {
  document.title = "ORCALITY - Usuários";
  const dataUser = useUser()?.user;

  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
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
