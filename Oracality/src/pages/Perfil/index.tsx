import { Button, Container } from "@mui/material";
import { useThemeContext } from "../../context/themeContext";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";

export function PaginaPerfil() {
  const dataUser = useUser().user;
  const { isDarkMode, toggleTheme } = useThemeContext();

  document.title = "ORCALITY - Perfil";
  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <h1>Perfil de {dataUser?.nome}</h1>
        <Button variant="contained" onClick={toggleTheme}>
          {isDarkMode
            ? "Alternar para Tema Claro"
            : "Alternar para Tema Escuro"}
        </Button>
      </Container>
    </>
  );
}
