import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { classeLancamentoCreateValidators, classeLancamentoGetIdValidator, classeLancamentoUpdateValidators } from "../validators/classeLancamentoValidators";
import { z } from "zod";

export async function ClasseLancamentoRoutes(app: FastifyInstance) {
    app.get("/classe-lancamento", async(request, reply) => {
        const {estaDeletado, page, limit} = z.object({
            estaDeletado: z.boolean().optional(),
            page: z.number().optional(),
            limit: z.number().optional()
        }).parse(request.query);
        try{
            const classes  = await prisma.classeLancamento.findMany({
                where: {
                    estaDeletado: false
                },
                skip: page ? (page - 1) * (limit ?? 10) : 0,
                take: limit
            });
            reply.code(200).send({success: true, data: classes});
        }
        catch(err){
            reply.code(500).send({ success: false ,data: "houve um erro ao carregar as classes de Lancamento"});
        }
    });
    app.post("/classe-lancamento", async(request, reply) => {
        const {nome} = classeLancamentoCreateValidators.parse(request.body); 
        try {
            const classe = await prisma.classeLancamento.create({
                data: {
                    nome
                }
            })
            reply.code(201).send({ success: true, data: "Classe de Lançamento criada com sucesso"});
        }
        catch(err){
            reply.code(500).send({ success: false, data: "houve um erro ao criar a classe de Lançamento"});
        }
    });
    app.put("/classe-lancamento/:id", async(request, reply) => {
        const {id} = classeLancamentoGetIdValidator.parse(request.params);
        const {nome, estaDeletado} = classeLancamentoUpdateValidators.parse(request.body);
        try {
            const classe = await prisma.classeLancamento.update({
                where: {
                    id
                },
                data: {
                    nome,
                    estaDeletado: estaDeletado ? estaDeletado : false
                }
            })
            reply.code(200).send({ success: true, data: "Classe de Lançamento atualizada com sucesso"});
        }
        catch(err){
            reply.code(500).send({ success: false, data: "houve um erro ao atualizar a classe de Lançamento"});
        }
    });
}