import React from "react";
import { Box, MenuItem, Select, useTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export interface FilterOptions {
  ordem: "asc" | "desc";
  field: "criadoEm" | "valor";
  dataInicio: string;
  dataFim: string;
  classeLancamento?: string;
}

interface ClasseLancamentoOption {
  id: string;
  nome: string;
}

interface FilterControlsProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  classesLancamentoOptions?: ClasseLancamentoOption[];
  mostUsedClass?: string;
  classCounts?: Record<string, number>;
  haveOrdem?: boolean;
  haveField?: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onChange,
  classesLancamentoOptions,
  mostUsedClass,
  classCounts,
  haveOrdem,
  haveField,
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {haveOrdem && (
          <Select
            value={filters.ordem}
            onChange={(e) =>
              onChange({ ...filters, ordem: e.target.value as "asc" | "desc" })
            }
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        )}

        {haveField && (
          <Select
            value={filters.field}
            onChange={(e) =>
              onChange({
                ...filters,
                field: e.target.value as "criadoEm" | "valor",
              })
            }
          >
            <MenuItem value="criadoEm">Data de Criação</MenuItem>
            <MenuItem value="valor">Valor</MenuItem>
          </Select>
        )}

        {/* DatePicker para Data Início */}
        <DatePicker
          label="Data Início"
          format="DD/MM/YYYY"
          value={filters.dataInicio ? dayjs(filters.dataInicio) : null}
          onChange={(newValue) =>
            onChange({
              ...filters,
              dataInicio: newValue?.format("YYYY-MM-DD") || "",
            })
          }
          slotProps={{
            textField: {
              variant: "outlined",
              sx: {
                svg: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
                input: { color: theme.palette.text.primary },
                label: { color: theme.palette.text.secondary },
              },
            },
          }}
        />

        {/* DatePicker para Data Fim */}
        <DatePicker
          label="Data Fim"
          format="DD/MM/YYYY"
          value={filters.dataFim ? dayjs(filters.dataFim) : null}
          onChange={(newValue) =>
            onChange({
              ...filters,
              dataFim: newValue?.format("YYYY-MM-DD") || "",
            })
          }
          slotProps={{
            textField: {
              variant: "outlined",
              sx: {
                svg: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
                input: { color: theme.palette.text.primary },
                label: { color: theme.palette.text.secondary },
              },
            },
          }}
        />

        {classesLancamentoOptions && (
          <Select
            value={filters.classeLancamento || ""}
            onChange={(e) =>
              onChange({ ...filters, classeLancamento: e.target.value })
            }
          >
            <MenuItem value="">
              Todas{" "}
              {classCounts &&
                Object.values(classCounts).reduce(
                  (sum, count) => sum + count,
                  0
                ) > 0 &&
                ` (${Object.values(classCounts).reduce(
                  (sum, count) => sum + count,
                  0
                )})`}
            </MenuItem>
            {mostUsedClass && (
              <MenuItem value={mostUsedClass}>
                Mais usada{" "}
                {classCounts && classCounts[mostUsedClass]
                  ? `(${classCounts[mostUsedClass]})`
                  : ""}
              </MenuItem>
            )}
            {classesLancamentoOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.nome}{" "}
                {classCounts && classCounts[option.id]
                  ? `(${classCounts[option.id]})`
                  : ""}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
    </LocalizationProvider>
  );
};
