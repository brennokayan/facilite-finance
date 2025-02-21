// gastosService.ts
import { dataToEditAndAddgastoAddEditType, gastosType } from "../types/gastoType";
import { api } from "./baseURl";

interface FiltrosGastos {
  ordem?: "asc" | "desc";
  field?: "criadoEm" | "valor";
  dataInicio?: string;
  dataFim?: string;
  classeLancamento?: string;
}

const gastosService = {
  getAll: (filtros?: FiltrosGastos) => api.get<gastosType>("/gastos", { params: filtros }),
  getById: (id: string) => api.get<gastosType>(`/gasto/${id}`),
  create: (data: dataToEditAndAddgastoAddEditType) => api.post("/gasto", data),
  update: (id: string, data: dataToEditAndAddgastoAddEditType) => api.put(`/gasto/${id}`, data),
};

export default gastosService;
