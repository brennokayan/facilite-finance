// lucrosService.ts
import { dataToEditAndAddLucroType, lucrosType } from "../types/lucroType";
import { api } from "./baseURl";

interface filtrosLucros {
  ordem?: "asc" | "desc";
  field?: "criadoEm" | "valor";
  dataInicio?: string;
  dataFim?: string;
  classeLancamento?: string;
}
const lucrosService = {
  getAll: (filtros?: filtrosLucros) => api.get<lucrosType>("/lucros", { params: filtros }),
  getById: (id: string) => api.get<lucrosType>(`/lucro/${id}`),
  create: (data: dataToEditAndAddLucroType) => api.post("/lucro", data),
  update: (id: string, data: dataToEditAndAddLucroType) => api.put(`/lucro/${id}`, data),
};

export default lucrosService;


