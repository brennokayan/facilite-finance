import { Box, Container } from "@mui/material";
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
        </Box>
      </Container>
    </>
  );
}
