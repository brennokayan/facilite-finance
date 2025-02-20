import { Box } from "@mui/material";
import { ThemeProviderWrapper } from "./context/themeContext";
import { DefaultRoutes } from "./routes/DefaultRoutes";
import { getToken } from "./utils/login";
import { GetUser } from "./service/usuarioService";
import { UserProvider } from "./context/userContext";
import { useUser } from "./hooks/userHooks";
import useSWR from "swr";

function AppContent() {
  const { setUser } = useUser();
  const {
    error,
    isLoading,
  } = useSWR("user", async () => {
    const response = await GetUser(getToken());
    setUser(response); // Atualiza o usuário no contexto
    return response;
  })
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;
  
  // React.useEffect(() => {
  //   GetUser(getToken())
  //     .then((response) => {
  //       setUser(response); // Atualiza o usuário no contexto
  //     })
  //     .catch(() => {
  //       return 
  //     });
  // }, [setUser]);

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
