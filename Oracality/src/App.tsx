import React from "react";
import { Box } from "@mui/material";
import { ThemeProviderWrapper } from "./context/themeContext";
import { DefaultRoutes } from "./routes/DefaultRoutes";
import { getToken } from "./utils/login";
import { GetUser } from "./service/usuarioService";
import { UserProvider } from "./context/userContext";
import { useUser } from "./hooks/userHooks";

function AppContent() {
  const { setUser } = useUser();

  React.useEffect(() => {
    GetUser(getToken())
      .then((response) => {
        setUser(response); // Atualiza o usuário no contexto
      })
      .catch(() => {
        return 
      });
  }, [setUser]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        minHeight: "100vh",
        pb: 2,
      }}
    >
      <DefaultRoutes />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProviderWrapper>
  );
}
