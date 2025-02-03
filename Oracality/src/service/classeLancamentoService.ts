// classeLancamentoService.ts
import { api } from "./baseURl";

type ClasseLancamento = {
  id?: string;
  nome: string;
  estaDeletado?: boolean;
};

const classeLancamentoService = {
  getAll: () => api.get<ClasseLancamento[]>("/classe-lancamento"),
  create: (data: ClasseLancamento) => api.post("/classe-lancamento", data),
  update: (id: string, data: ClasseLancamento) =>
    api.put(`/classe-lancamento/${id}`, data),
};

export default classeLancamentoService;
