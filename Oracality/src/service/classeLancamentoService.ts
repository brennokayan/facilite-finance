// classeLancamentoService.ts
import { dataToEditAndAddClasseLancamentoType } from "../types/classeLancamentoType";
import { api } from "./baseURl";



const classeLancamentoService = {
  getAll: () => api.get("/classe-lancamento"),
  getSaida: () => api.get("/classe-lancamento/saida"),
  getEntrada: () => api.get("/classe-lancamento/entrada"),
  create: (data: dataToEditAndAddClasseLancamentoType) => api.post("/classe-lancamento", data),
  update: (id: string, data: dataToEditAndAddClasseLancamentoType) =>
    api.put(`/classe-lancamento/${id}`, data),
};

export default classeLancamentoService;
