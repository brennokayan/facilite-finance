import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PaginaLogin } from "../pages/Login";
import { PaginaLogout } from "../pages/Logout";
import { PaginaPainelDeControle } from "../pages/Painel_de_controle";
import { PaginaLucros } from "../pages/Lucros";
import { PaginaGastos } from "../pages/Gastos";
import { PaginaUsuarios } from "../pages/Usuarios";
import { PaginaPerfil } from "../pages/Perfil";
import { ClasseLancamento } from "../pages/ClasseLancamento";

export function DefaultRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/logout" element={<PaginaLogout />} />
        <Route path="*" element={<>not found</>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<PaginaPainelDeControle />} />
          <Route path="/lucros" element={<PaginaLucros />} />
          <Route path="/gastos" element={<PaginaGastos />} />
          <Route path="/classe-lancamento" element={<ClasseLancamento />} />
          <Route path="/usuarios" element={<PaginaUsuarios />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="*" element={<Navigate to={"/dashboard"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
