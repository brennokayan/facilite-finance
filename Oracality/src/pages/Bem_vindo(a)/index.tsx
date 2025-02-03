import { Box, Container, Typography } from "@mui/material";
import { ComponenteCarrossel } from "./components/carrossel";
export function PaginaBemVindo() {
  window.document.title = "ORCALITY - Bem vindo(a)";
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "row",
          gap: 2,
          bgcolor: "#54B065",
        }}
      >
        <Box
          sx={{
            height: { xs: "65%", sm: "90%" },
            width: { xs: "100%", sm: "100%", md: "50%" },
            borderRadius: 2,
            boxShadow: "9px 9px 8px  rgba(0,0,0,0.4)",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: -2,
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5" component="div" sx={{
              fontWeight: "bold",
              fontSize: {xs: "1rem", md: "1.5rem"},
            }}>
              Bem vindo(a) a ORCALITY.
            </Typography>
            <Typography variant="caption"         sx={{
          fontSize: {xs: ".6rem", md: "0.8rem"},
        }}>
              Controle de gastos e lucros de forma simples e eficiente.
            </Typography>
            <Box>
              <ComponenteCarrossel />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
                mt: 1,
              }}
            >
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            height: { xs: "65%", sm: "90%" },
            width: "50%",
            borderRadius: 2,
            backgroundColor: "white",
            display: { sm: "none", lg: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box> */}
      </Container>
    </>
  );
}
