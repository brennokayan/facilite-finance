// lucrosService.ts
import { api } from "./baseURl";

type Lucro = {
  id?: string;
  titulo: string;
  descricao: string;
  dataPrevista: string;
  valor: number;
  estaRecebido?: boolean;
  estaDeletado?: boolean;
  idUsuario: string;
};

const lucrosService = {
  getAll: () => api.get<Lucro[]>("/lucros"),
  getById: (id: string) => api.get<Lucro>(`/lucro/${id}`),
  create: (data: Lucro) => api.post("/lucro", data),
  update: (id: string, data: Lucro) => api.put(`/lucro/${id}`, data),
};

export default lucrosService;
