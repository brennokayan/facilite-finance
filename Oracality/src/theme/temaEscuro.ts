import { createTheme } from "@mui/material/styles";

export const DarkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif", // Defina a fonte globalmente
  },
  palette: {
    mode: "dark", // Define o tema como "dark"
    primary: {
      main: "#60AD5E", // Verde principal (destaques)
      light: "#81C784", // Verde claro
      dark: "#388E3C", // Verde mais escuro
    },
    secondary: {
      main: "#4FC3F7", // Azul principal
      light: "#81D4FA",
      dark: "#039BE5",
    },
    background: {
      default: "#121212", // Fundo principal escuro
      paper: "#1E1E1E", // Fundo de cartões/brancos (escuro)
    },
    text: {
      primary: "#FFFFFF", // Texto principal (branco)
      secondary: "#BDBDBD", // Texto secundário (cinza claro)
    },
    success: {
      main: "#4CAF50", // Verde para status positivos
    },
    error: {
      main: "#EF5350", // Vermelho para alertas e erros
    },
    warning: {
      main: "#FFB74D", // Laranja para avisos
    },
    info: {
      main: "#29B6F6", // Azul para informações
    },
  },
  
});

