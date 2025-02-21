import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import {
  createGastoValidators,
  getUniqueGastoValidator,
  updateGastoValidators,
} from "../validators/gastosValidators";
import { z } from "zod";

export async function GastosRoutes(app: FastifyInstance) {
  const querySchema = z.object({
    ordem: z.enum(["asc", "desc"]).optional(),
    field: z.enum(["criadoEm", "valor"]).optional(), // qual campo ordenar
    dataInicio: z.string().optional(),
    dataFim: z.string().optional(),
    classeLancamento: z.string().optional(), // novo filtro para classe de lançamento
  });

  app.get("/gastos", async (request, reply) => {
    const { ordem, field, dataInicio, dataFim, classeLancamento } =
      querySchema.parse(request.query);

    const where: any = { estaDeletado: false };

    // Aqui vamos converter as datas de filtro do horário local para os limites em UTC.
    // Exemplo: para UTC‑3, o início do dia 19 (local) equivale a 2025-02-19T03:00:00.000Z
    // e o final do dia 19 (local) equivale a 2025-02-20T02:59:59.999Z.
    if (dataInicio || dataFim) {
      where.criadoEm = {};

      // Defina o offset em horas do seu fuso local (exemplo: 3 para UTC‑3)
      const offsetHours = 3;

      if (dataInicio) {
        const [year, month, day] = dataInicio.split('-').map(Number);
        // Início do dia local (00:00:00.000) convertido para UTC
        const inicioUTC = new Date(Date.UTC(year, month - 1, day, offsetHours, 0, 0, 0));
        where.criadoEm.gte = inicioUTC;
      }
      if (dataFim) {
        const [year, month, day] = dataFim.split('-').map(Number);
        // Pegamos o início do dia local convertido para UTC...
        let fimUTC = new Date(Date.UTC(year, month - 1, day, offsetHours, 0, 0, 0));
        // ...avançamos 1 dia e subtraímos 1 milissegundo para obter o final do dia local
        fimUTC.setUTCDate(fimUTC.getUTCDate() + 1);
        fimUTC.setUTCMilliseconds(fimUTC.getUTCMilliseconds() - 1);
        where.criadoEm.lte = fimUTC;
      }
    }

    // Filtro por classe de lançamento, se fornecido
    if (classeLancamento) {
      where.idClasseLancamento = classeLancamento;
    }

    try {
      const gastos = await prisma.gastos.findMany({
        where,
        select: {
          id: true,
          valor: true,
          estaPago: true,
          titulo: true,
          estaDeletado: true,
          idUsuario: true,
          idClasseLancamento: true,
          criadoEm: true,
          ModificadoEm: true,
          ClasseLucro: {
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
      reply.status(200).send({ data: gastos });
    } catch (err) {
      reply.status(500).send({ error: err });
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
