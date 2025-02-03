import { z } from "zod";

export const classeLancamentoGetIdValidator = z.object({
    id: z.string().cuid()
})

export const classeLancamentoCreateValidators = z.object({
    nome: z.string().min(3).max(255),
})

export const classeLancamentoUpdateValidators = z.object({
    nome: z.string().min(3).max(255),
    estaDeletado: z.boolean().optional()
})