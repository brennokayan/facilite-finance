import { FastifyInstance } from "fastify";
import { UsuarioRoutes } from "./usuario";
import { LucroRoutes } from "./lucros";
import { GastosRoutes } from "./gastos";
import { Authentication } from "./login";

export async function Routes(app: FastifyInstance){
    app.register(UsuarioRoutes);
    app.register(LucroRoutes);
    app.register(GastosRoutes);
    app.register(Authentication);
}