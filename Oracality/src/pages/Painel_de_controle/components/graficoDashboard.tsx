//graficoDashboard.tsx

import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface graficoDashboardProps {
  data: object[];
  titulo: string;
  corBarra: string | undefined;
  BarDataKey: string;
  XDataKey: string;
}

export function ComponenteGraficoDashboard(props: graficoDashboardProps) {

  return (
    <>
      <Box
        sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">{props.titulo}</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={props.data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey={props.XDataKey} fontSize={12} />
            <YAxis />
            <Tooltip 
              contentStyle={{backgroundColor: 'white', borderRadius: '5px', color: 'black'}}
            />
            <Legend />
            <Bar
              dataKey={props.BarDataKey}
              fill={props.corBarra}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
