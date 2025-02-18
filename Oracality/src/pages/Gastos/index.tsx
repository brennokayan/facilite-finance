import { Container } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";

export function PaginaGastos() {
  const dataUser = useUser()?.user;
  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <h1>Gastos</h1>
      </Container>
    </>
  );
}
