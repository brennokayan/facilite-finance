import { api } from "./baseURl";

export async function GetUser(id: string|null){
  const response = await api.get(`/usuario/${id}`);
  return response.data.data;
}


export async function CreateUser(data: {nome: string, senha: string, estaAdmin: boolean}){
  const response = await api.post('/usuario', data);
  return response.data.data;
}

export async function GetUsers(){
  const response = await api.get('/usuarios');
  return response.data.data;
}

export async function ModifyUser(id: string, data: {
  nome: string,
  senha: string,
  estaAdmin: boolean
  estaDeletado: boolean
  estaAtivo: boolean
}){
  const response = await api.put(`/usuario/:${id}`, data);
  return response.data.data;
}