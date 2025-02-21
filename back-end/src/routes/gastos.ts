import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import {
  createGastoValidators,
  getUniqueGastoValidator,
  updateGastoValidators,
} from "../validators/gastosValidators";
import { z } from "zod";

export async function GastosRoutes(app: FastifyInstance) {
  app.get("/gastos", async (request, reply) => {
    const { ordem } = z.object({
      ordem: z.enum(["asc", "desc"]).optional(),
    }).parse(request.query);
    try {
      const gastos = await prisma.gastos.findMany({
        where: {
          estaDeletado: false,
        },
        select:{
          id:true,
          valor:true,
          estaPago:true,
          titulo:true,
          estaDeletado:true,
          idUsuario:true,
          idClasseLancamento:true,
          criadoEm:true,
          ModificadoEm:true,
          ClasseLucro: {
            select: {
              nome: true,
            },
          },
          Usuario: {
            select: {
              nome: true,
            },
          }
        },
        orderBy: {
          criadoEm: ordem || "desc",
        }
      });
      reply.send({ data: gastos }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.get("/gasto/:id", async (request, reply) => {
    const { id } = getUniqueGastoValidator.parse(request.params);
    try {
      const gasto = await prisma.gastos.findUnique({
        where: {
          id,
        },
      });
      reply.send({ data: gasto }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.post("/gasto", async (request, reply) => {
    const {
      idClasseLancamento,
      valor,
      estaPago,
      estaDeletado,
      idUsuario,
      titulo,
    } = createGastoValidators.parse(request.body);
    try {
      const gasto = await prisma.gastos.create({
        data: {
          valor,
          estaPago,
          titulo,
          estaDeletado,
          idUsuario,
          idClasseLancamento,
        },
      });
      reply.send({ data: "Gasto criado com sucesso" }).status(201);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.put("/gasto/:id", async (request, reply) => {
    const { id } = getUniqueGastoValidator.parse(request.params);
    const { idClasseLancamento, valor, estaPago, estaDeletado, idUsuario } =
      updateGastoValidators.parse(request.body);
    try {
      const gasto = await prisma.gastos.update({
        where: {
          id,
        },
        data: {
          valor,
          estaPago,
          estaDeletado,
          idUsuario,
          idClasseLancamento,
        },
      });
      reply.send({ data: "Gasto atualizado com sucesso" }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
}
