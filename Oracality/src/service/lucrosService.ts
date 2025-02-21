// lucrosService.ts
import { dataToEditAndAddLucroType, lucrosType } from "../types/lucroType";
import { api } from "./baseURl";

const lucrosService = {
  getAll: () => api.get<lucrosType>("/lucros"),
  getById: (id: string) => api.get<lucrosType>(`/lucro/${id}`),
  create: (data: dataToEditAndAddLucroType) => api.post("/lucro", data),
  update: (id: string, data: dataToEditAndAddLucroType) => api.put(`/lucro/${id}`, data),
};

export default lucrosService;


