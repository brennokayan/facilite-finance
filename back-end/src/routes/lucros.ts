import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import {
  createLucroValidator,
  getUniqueLucroValidator,
  updateLucroValidator,
} from "../validators/lucrosValidators";
import { z } from "zod";

export async function LucroRoutes(app: FastifyInstance) {
  app.get("/lucros", async (request, reply) => {
    const { ordem, field, dataInicio, dataFim, classeLancamento } = z
      .object({
        ordem: z.enum(["asc", "desc"]).optional(),
        field: z.enum(["criadoEm", "valor"]).optional(),
        dataInicio: z.string().optional(),
        dataFim: z.string().optional(),
        classeLancamento: z.string().optional(),
      })
      .parse(request.query);
  
    const where: any = { estaDeletado: false };
  
    // Filtragem por data
    if (dataInicio || dataFim) {
      where.criadoEm = {};
      if (dataInicio) {
        // Define explicitamente o início do dia (00:00:00)
        const inicio = new Date(`${dataInicio}T00:00:00`);
        where.criadoEm.gte = inicio;
      }
      if (dataFim) {
        // Define explicitamente o final do dia (23:59:59.999)
        const fim = new Date(`${dataFim}T23:59:59.999`);
        where.criadoEm.lte = fim;
      }
    }
  
    // Filtragem por classe de lançamento, se fornecida
    if (classeLancamento) {
      where.idClasseLancamento = classeLancamento;
    }
  
    try {
      const lucros = await prisma.lucros.findMany({
        where,
        select: {
          id: true,
          valor: true,
          estaRecebido: true,
          titulo: true,
          estaDeletado: true,
          idUsuario: true,
          idClasseLancamento: true,
          criadoEm: true,
          ModificadoEm: true,
          ClasseLancamento: {
            select: {
              nome: true,
            },
          },
          Usuario: {
            select: {
              nome: true,
            },
          },
        },
        orderBy: {
          [field || "criadoEm"]: ordem || "desc",
        },
      });
      reply.status(200).send({ data: lucros });
    } catch (err) {
      reply.status(500).send({ error: err });
    }
  });
  app.get("/lucro/:id", async (request, reply) => {
    const { id } = getUniqueLucroValidator.parse(request.params);
    try {
      const lucro = await prisma.lucros.findUnique({
        where: {
          id,
        },
      });
      reply.send({ data: lucro }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.post("/lucro", async (request, reply) => {
    const {
      titulo,
      idClasseLancamento,
      valor,
      estaRecebido,
      estaDeletado,
      idUsuario,
    } = createLucroValidator.parse(request.body);
    try {
      const lucro = await prisma.lucros.create({
        data: {
          titulo,
          valor,
          estaRecebido,
          estaDeletado,
          idUsuario,
          idClasseLancamento,
        },
      });
      reply.send({ data: "Lucro criado com sucesso" }).status(201);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
  app.put("/lucro/:id", async (request, reply) => {
    const { id } = getUniqueLucroValidator.parse(request.params);
    const {
      titulo,
      valor,
      idClasseLancamento,
      estaRecebido,
      estaDeletado,
      idUsuario,
    } = updateLucroValidator.parse(request.body);
    try {
      const lucro = await prisma.lucros.update({
        where: {
          id,
        },
        data: {
          titulo,
          valor,
          estaRecebido,
          estaDeletado,
          idUsuario,
          idClasseLancamento,
        },
      });
      reply.send({ data: "Lucro atualizado com sucesso" }).status(200);
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
}
