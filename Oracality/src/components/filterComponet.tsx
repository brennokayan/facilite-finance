import React from "react";
import { Box, MenuItem, Select, TextField } from "@mui/material";

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
  // Novo: mapeamento de id da classe para quantidade de registros
  classCounts?: Record<string, number>;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onChange,
  classesLancamentoOptions,
  mostUsedClass,
  classCounts,
}) => {
  return (
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
      <Select
        value={filters.ordem}
        onChange={(e) =>
          onChange({ ...filters, ordem: e.target.value as "asc" | "desc" })
        }
      >
        <MenuItem value="asc">Ascendente</MenuItem>
        <MenuItem value="desc">Descendente</MenuItem>
      </Select>
      <Select
        value={filters.field}
        onChange={(e) =>
          onChange({ ...filters, field: e.target.value as "criadoEm" | "valor" })
        }
      >
        <MenuItem value="criadoEm">Data de Criação</MenuItem>
        <MenuItem value="valor">Valor</MenuItem>
      </Select>
      <TextField
        label="Data Início"
        type="date"
        value={filters.dataInicio}
        onChange={(e) =>
          onChange({ ...filters, dataInicio: e.target.value })
        }
      />
      <TextField
        label="Data Fim"
        type="date"
        value={filters.dataFim}
        onChange={(e) =>
          onChange({ ...filters, dataFim: e.target.value })
        }
      />
      {classesLancamentoOptions && (
        <Select
          value={filters.classeLancamento || ""}
          onChange={(e) =>
            onChange({ ...filters, classeLancamento: e.target.value })
          }
        >
          <MenuItem value="">
            Todas
            {classCounts &&
              Object.values(classCounts).reduce((sum, count) => sum + count, 0) > 0 &&
              ` (${Object.values(classCounts).reduce((sum, count) => sum + count, 0)})`}
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
  );
};
