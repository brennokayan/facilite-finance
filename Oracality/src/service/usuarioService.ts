// usuarioService.ts
import { api } from "./baseURl";

type Usuario = {
  id?: string;
  nome: string;
  senha?: string;
  estaAtivo?: boolean;
  estaDeletado?: boolean;
  estaAdmin?: boolean;
};

const usuarioService = {
  getAll: () => api.get<Usuario[]>("/usuarios"),
  getById: (id: string) => api.get<Usuario>(`/usuario/${id}`),
  create: (data: Usuario) => api.post("/usuario", data),
  update: (id: string, data: Usuario) => api.put(`/usuario/${id}`, data),
};

export default usuarioService;
