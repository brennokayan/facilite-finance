import { string, z } from "zod";

export const getUniqueGastoValidator = z.object({
    id: z.string().cuid()
})

export const updateGastoValidators = z.object({
    idClasseLancamento: z.string().cuid().optional(),
    valor: z.number().positive().optional(),
    estaPago: z.boolean().optional(),
    titulo: string().min(3).max(255).optional(),
    estaDeletado: z.boolean().optional(),
    idUsuario: z.string().cuid().optional()
})

export const createGastoValidators = z.object({
    idClasseLancamento: z.string().cuid(),
    valor: z.number().positive(),
    titulo: string().min(3).max(255),
    estaPago: z.boolean(),
    estaDeletado: z.boolean(),
    idUsuario: z.string().cuid()
})