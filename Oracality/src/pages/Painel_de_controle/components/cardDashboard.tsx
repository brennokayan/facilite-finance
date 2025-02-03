import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { ToBRL } from "../../../utils/defaultFunctions";

interface CardDashboardProps {
  titulo: string;
  tipo: "USUARIOS" | "LUCROS" | "GASTOS";
  valor?: number;
  icone: React.ReactNode;
}

export function CompoenenteCardDashboard(props: CardDashboardProps) {
  return (
    <>
      <Card
        sx={{
          width: {
            xs: 150,
            lg: 300
          },
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          cursor: "pointer",
          borderRadius: 2,
          boxShadow: 2,
          padding: 2,
          flexDirection: {
            xs: "column",
            lg: "row"
          },
        }}
        onClick={() => {window.location.href="/"+props.tipo.toLowerCase()}}
      >
        {props.icone}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.tipo === "USUARIOS" ? (
            <>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      lg: 16
                    },
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {props.tipo === "USUARIOS" ? "USUÁRIOS" : ""}
                </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: 8,
                    lg: 16
                  },
                  fontWeight: "bold",
                  color: (theme) => theme.palette.secondary.main,
                }}
              >
                Ver os usuários
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      lg: 16
                    },
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {props.tipo}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      lg: 24
                    },
                    fontWeight: "bold",
                    color:
                      props.tipo === "LUCROS"
                        ? (theme) => theme.palette.primary.main
                        : (theme) => theme.palette.error.main,
                  }}
                >
                  {ToBRL(props.valor || 0)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </>
  );
}
