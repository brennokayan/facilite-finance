import { z } from "zod";

export const getUniqueUserValidator = z.object({
    id: z.string().cuid()
})


export const createUserValidator = z.object({
    nome: z.string().min(3).max(255),
    senha: z.string().min(6).max(255),
    estaAtivo: z.boolean().optional(),
    estaDeletado: z.boolean().optional(),
    estaAdmin: z.boolean().optional(),
})
