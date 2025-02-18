import { api } from "./baseURl";

export async function AuthenticateLogin(data: {nome: string, senha: string}) {
  const response = await api.post('/auth', data);
  return response.data.data;

}