import { Button, Container } from "@mui/material";
import { useThemeContext } from "../../context/themeContext";
import ComponenteNavBar from "../../components/navBar";

export function PaginaPerfil() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  document.title = "ORCALITY - Perfil";
  return (
    <>
      <ComponenteNavBar nomeUsuario="Brenno Kayan" />
      <Container maxWidth="lg">
        <h1>Perfil</h1>
        <Button variant="contained" onClick={toggleTheme}>
          {isDarkMode
            ? "Alternar para Tema Claro"
            : "Alternar para Tema Escuro"}
        </Button>
      </Container>
    </>
  );
}
