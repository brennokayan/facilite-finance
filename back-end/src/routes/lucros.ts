import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { createLucroValidator, getUniqueLucroValidator, updateLucroValidator } from "../validators/lucrosValidators";

export async function LucroRoutes(app: FastifyInstance){
    app.get("/lucros", async (request, reply) => {
        try {
            const lucros = await prisma.lucros.findMany({});
            reply.send({ data: lucros }).status(200);
        } catch (err) {
            reply.send({ error: err }).status(500);
        }
    })
    app.get("/lucro/:id", async (request, reply) => {
        const { id } = getUniqueLucroValidator.parse(request.params);
        try {
            const lucro = await prisma.lucros.findUnique({
                where: {
                    id
                }
            })
            reply.send({ data: lucro }).status(200);
        } catch (err) {
            reply.send({ error: err }).status(500);
        }
    })
    app.post("/lucro", async (request, reply) => {
        const { titulo, idClasseLancamento, valor, estaRecebido, estaDeletado, idUsuario } = createLucroValidator.parse(request.body);
        try {
            const lucro = await prisma.lucros.create({
                data: {
                    titulo,
                    valor,
                    estaRecebido,
                    estaDeletado,
                    idUsuario,
                    idClasseLancamento
                }
            })
            reply.send({ data: "Lucro criado com sucesso" }).status(201);
        } catch (err) {
            reply.send({ error: err }).status(500);
        }
    })
    app.put("/lucro/:id", async (request, reply) => {
        const { id } = getUniqueLucroValidator.parse(request.params);
        const { titulo, valor, idClasseLancamento, estaRecebido, estaDeletado, idUsuario } = updateLucroValidator.parse(request.body);
        try {
            const lucro = await prisma.lucros.update({
                where: {
                    id
                },
                data: {
                    titulo,
                    valor,
                    estaRecebido,
                    estaDeletado,
                    idUsuario,
                    idClasseLancamento
                }
            })
            reply.send({ data: "Lucro atualizado com sucesso" }).status(200);
        } catch (err) {
            reply.send({ error: err }).status(500);
        }
    })
}