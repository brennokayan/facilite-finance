import { Box } from "@mui/material";
import { DefaultIcons } from "../../../utils/defaultIcons";
import { CompoenenteCardDashboard } from "./cardDashboard";

export function ComponenteContainerCardDashboard() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        gap: 4,
        pt: 2,
      }}
    >
      <CompoenenteCardDashboard
        icone={
          <Box sx={{ color: (theme) => theme.palette.secondary.main }}>
            <DefaultIcons.Usuarios size={28} />
          </Box>
        }
        tipo="USUARIOS"
        titulo="Ir aos Usuários"
        valor={0}
      />
      <CompoenenteCardDashboard
        icone={
          <Box sx={{ color: (theme) => theme.palette.primary.main }}>
            <DefaultIcons.Lucros size={28} />
          </Box>
        }
        tipo="LUCROS"
        titulo="Ver Lucros"
        valor={10.9}
      />
      <CompoenenteCardDashboard
        icone={
          <Box sx={{ color: (theme) => theme.palette.error.main }}>
            <DefaultIcons.Gasto size={28} />
          </Box>
        }
        tipo="GASTOS"
        titulo="Ver Gastos"
        valor={10.9}
      />
    </Box>
  );
}
