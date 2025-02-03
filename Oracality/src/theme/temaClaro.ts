import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif", // Defina a fonte globalmente
  },
  palette: {
    primary: {
      main: "#2E7D32", // Verde principal (botões e destaques)
      light: "#60AD5E", // Verde claro
      dark: "#005005", // Verde escuro
    },
    secondary: {
      main: "#1E88E5", // Azul (para botões secundários ou links)
      light: "#6AB7FF",
      dark: "#005CB2",
    },
    background: {
      default: "#F0F4F8", // Fundo geral neutro
      paper: "#FFFFFF", // Cartões/brancos (como o fundo do login)
    },
    text: {
      primary: "#333333", // Texto principal (quase preto)
      secondary: "#757575", // Texto secundário (cinza médio)
    },
    success: {
      main: "#2E7D32", // Verde para status positivos
    },
    error: {
      main: "#D32F2F", // Vermelho para alertas e erros
    },
  },
  
});
