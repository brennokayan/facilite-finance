import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import {
  createUserValidator,
  getUniqueUserValidator,
} from "../validators/usuarioValidators";
import { paginationValidator } from "../validators/paginationValidators";
import { hash } from "bcrypt";

export async function UsuarioRoutes(app: FastifyInstance) {
  app.get("/usuarios", async (request, reply) => {
    // Validando os parâmetros de consulta
    const { page, limit } = paginationValidator.parse(request.query);
    const skip = (page - 1) * limit; // Calcular quantos registros pular
  
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          estaAtivo: true,
          estaDeletado: true,
          estaAdmin: true,
          Lucros: {
            select: {
              id: true,
              titulo: true,
              valor: true,
              estaRecebido: true,
            },
            take: limit, // Limitar a quantidade de lucros
            skip: skip,  // Pular os lucros já lidos
            orderBy: {
              criadoEm: 'asc',
            },
          },
          Gastos: {
            select: {
              id: true,
              valor: true,
              estaPago: true,
            },
            take: limit, // Limitar a quantidade de gastos
            skip: skip,  // Pular os gastos já lidos
            orderBy: {
              criadoEm: 'asc',
            },
          },
        },
      });
      reply.send({ data: usuarios }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  
  app.get("/usuario/:id", async (request, reply) => {
    const { id } = getUniqueUserValidator.parse(request.params);
    // Validando os parâmetros de consulta
    const { page, limit } = paginationValidator.parse(request.query);
    const skip = (page - 1) * limit; // Calcular quantos registros pular
  
    try {
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          nome: true,
          estaAtivo: true,
          estaDeletado: true,
          estaAdmin: true,
          Lucros: {
            select: {
              id: true,
              titulo: true,
              valor: true,
              estaRecebido: true,
            },
            take: limit,
            skip: skip,
            orderBy: {
              criadoEm: 'asc',
            },
          },
          Gastos: {
            select: {
              id: true,
              valor: true,
              estaPago: true,
            },
            take: limit,
            skip: skip,
            orderBy: {
              criadoEm: 'asc',
            },
          },
        },
      });
      reply.send({ data: usuario }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.post("/usuario", async (request, reply) => {
    const { nome, senha, estaAdmin } = createUserValidator.parse(request.body);
    const hashedPassword = await hash(senha, 10);
    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          senha: hashedPassword,
          estaAdmin: estaAdmin || false,
        },
      });
      reply.send({ data: "Usuário criado com sucesso" }).status(201);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.put("/usuario/:id", async (request, reply) => {
    const { id } = getUniqueUserValidator.parse(request.params);
    const { nome, senha, estaAtivo, estaDeletado, estaAdmin } =
      createUserValidator.parse(request.body);
    try {
      await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          nome,
          senha,
          estaAtivo,
          estaDeletado,
          estaAdmin,
        },
      });
      reply.send({ data: "Usuário atualizado com sucesso" }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
}
