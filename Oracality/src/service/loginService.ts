// loginService.ts
import { api } from "./baseURl";

type LoginResponse = {
  data?: { id: string };
  error?: string;
};

type Credentials = {
  nome: string;
  senha: string;
};

const loginService = {
  authenticate: (credentials: Credentials) =>
    api.post<LoginResponse>("/auth", credentials),
};

export default loginService;
