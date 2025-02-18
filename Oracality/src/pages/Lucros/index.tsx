import { Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";

export function PaginaLucros() {
    const dataUser = useUser()?.user;
    return (
      <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <h1>Lucros</h1>
      </Container>
    </>
  );
}
