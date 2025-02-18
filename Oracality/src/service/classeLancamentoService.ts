// classeLancamentoService.ts
import { dataToEditAndAddClasseLancamentoType } from "../types/classeLancamentoType";
import { api } from "./baseURl";



const classeLancamentoService = {
  getAll: () => api.get("/classe-lancamento"),
  create: (data: dataToEditAndAddClasseLancamentoType) => api.post("/classe-lancamento", data),
  update: (id: string, data: dataToEditAndAddClasseLancamentoType) =>
    api.put(`/classe-lancamento/${id}`, data),
};

export default classeLancamentoService;
