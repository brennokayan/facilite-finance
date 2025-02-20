import { MenuItem } from "@mui/material";
import { classeLancamentoType } from "../../../types/classeLancamentoType";

export function optionsSelect(
    isLoading: boolean,
    error: unknown,
    classeLancamento: classeLancamentoType
  ) {
    if (isLoading) {
      return <MenuItem>Carregando...</MenuItem>;
    }
    if (error) {
      return <MenuItem>Erro ao carregar</MenuItem>;
    }

    return classeLancamento?.data.map((item, index: number) => (
      <MenuItem key={item.id || index} value={item.id}>
        {item.nome}
      </MenuItem>
    ));
  }