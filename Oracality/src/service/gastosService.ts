// gastosService.ts
import { dataToEditAndAddgastoAddEditType, gastosType } from "../types/gastoType";
import { api } from "./baseURl";



const gastosService = {
  getAll: () => api.get<gastosType>("/gastos"),
  getById: (id: string) => api.get<gastosType>(`/gasto/${id}`),
  create: (data: dataToEditAndAddgastoAddEditType) => api.post("/gasto", data),
  update: (id: string, data: dataToEditAndAddgastoAddEditType) => api.put(`/gasto/${id}`, data),
};

export default gastosService;
