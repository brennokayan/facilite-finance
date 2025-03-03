import { Box, Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { getDataUserInCoockie } from "../../utils/defaultFunctions";

export function PaginaUsuarios() {
  document.title = "ORCALITY - Usuários";
  const dataUser = getDataUserInCoockie();

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
