import { Box } from "@mui/material";
import { ThemeProviderWrapper } from "./context/themeContext";
import { DefaultRoutes } from "./routes/DefaultRoutes";
import { UserProvider } from "./context/userContext";

function AppContent() {



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
