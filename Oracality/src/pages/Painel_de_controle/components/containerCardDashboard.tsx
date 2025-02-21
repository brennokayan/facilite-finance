//containerCardDashboard.tsx
import { Box } from "@mui/material";
import { DefaultIcons } from "../../../utils/defaultIcons";
import { CompoenenteCardDashboard } from "./cardDashboard";
import { gastosType } from "../../../types/gastoType";
import { lucrosType } from "../../../types/lucroType";
import { CalcFinalValue } from "../../../utils/defaultFunctions";

interface Props {
  gastos: gastosType | undefined;
  lucros: lucrosType | undefined
}


export function ComponenteContainerCardDashboard(Props: Props) {
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
            <DefaultIcons.ClasseLancamento size={28} />
          </Box>
        }
        tipo="CLASSE-LANCAMENTO"
        titulo="Ir as Classe de Lançamentos"
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
        valor={CalcFinalValue(Props.lucros?.data.map((item) => item.valor))}
      />
      <CompoenenteCardDashboard
        icone={
          <Box sx={{ color: (theme) => theme.palette.error.main }}>
            <DefaultIcons.Gasto size={28} />
          </Box>
        }
        tipo="GASTOS"
        titulo="Ver Gastos"
        valor={CalcFinalValue(Props.gastos?.data.map((item) => item.valor))}
      />
    </Box>
  );
}
