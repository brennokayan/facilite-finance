import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma";
import { compare } from "bcrypt";

export async function Authentication(app: FastifyInstance) {
  app.post("/auth", async (request, reply) => {
    const { nome, senha } = z
      .object({
        nome: z.string(),
        senha: z.string().min(6).max(255),
      })
      .parse(request.body);
    try {
      const user = await prisma.usuario.findUnique({
        where: {
          nome,
        },
      });
      if (!user) {
        reply.send({ error: "Usuário não encontrado" }).status(404);
      } else {
        const isPasswordValid = await compare(senha, user.senha);
        if (isPasswordValid) {
          reply
            .send({
              data: {
                id: user.id,
              },
            })
            .status(200);
        } else {
          reply.send({ error: "Senha inválida" }).status(401);
        }
      }
    } catch (err) {
      reply.send({ error: err }).status(500);
    }
  });
}
