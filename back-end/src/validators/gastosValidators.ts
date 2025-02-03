import { string, z } from "zod";

export const getUniqueGastoValidator = z.object({
    id: z.string().cuid()
})

export const updateGastoValidators = z.object({
    descricao: z.string().min(3).max(255).optional(),
    valor: z.number().positive().optional(),
    dataPrevista: z.string().optional(),
    estaPago: z.boolean().optional(),
    titulo: string().min(3).max(255).optional(),
    estaDeletado: z.boolean().optional(),
    idUsuario: z.string().cuid().optional()
})

export const createGastoValidators = z.object({
    descricao: z.string().min(3).max(255),
    valor: z.number().positive(),
    dataPrevista: z.string(),
    titulo: string().min(3).max(255),
    estaPago: z.boolean(),
    estaDeletado: z.boolean(),
    idUsuario: z.string().cuid()
})