// gastosService.ts
import { api } from "./baseURl";

type Gasto = {
  id?: string;
  descricao: string;
  valor: number;
  dataPrevista: string;
  estaPago?: boolean;
  estaDeletado?: boolean;
  idUsuario: string;
};

const gastosService = {
  getAll: () => api.get<Gasto[]>("/gastos"),
  getById: (id: string) => api.get<Gasto>(`/gasto/${id}`),
  create: (data: Gasto) => api.post("/gasto", data),
  update: (id: string, data: Gasto) => api.put(`/gasto/${id}`, data),
};

export default gastosService;
