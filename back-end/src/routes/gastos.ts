import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import {
  createGastoValidators,
  getUniqueGastoValidator,
  updateGastoValidators,
} from "../validators/gastosValidators";

export async function GastosRoutes(app: FastifyInstance) {
  app.get("/gastos", async (request, reply) => {
    try {
      const gastos = await prisma.gastos.findMany({});
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
      descricao,
      valor,
      dataPrevista,
      estaPago,
      estaDeletado,
      idUsuario,
      titulo,
    } = createGastoValidators.parse(request.body);
    try {
      const gasto = await prisma.gastos.create({
        data: {
          descricao,
          valor,
          dataPrevista,
          estaPago,
          titulo,
          estaDeletado,
          idUsuario,
        },
      });
      reply.send({ data: "Gasto criado com sucesso" }).status(201);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.put("/gasto/:id", async (request, reply) => {
    const { id } = getUniqueGastoValidator.parse(request.params);
    const { descricao, valor, dataPrevista, estaPago, estaDeletado, idUsuario } =
      updateGastoValidators.parse(request.body);
    try {
      const gasto = await prisma.gastos.update({
        where: {
          id,
        },
        data: {
          descricao,
          valor,
          dataPrevista,
          estaPago,
          estaDeletado,
          idUsuario,
        },
      });
      reply.send({ data: "Gasto atualizado com sucesso" }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
}
