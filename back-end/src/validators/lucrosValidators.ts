import { z } from "zod";

export const getUniqueLucroValidator = z.object({
  id: z.string().cuid(),
});
export const updateLucroValidator = z.object({
  titulo: z.string().min(3).max(255).optional(),
  valor: z.number().positive().optional(),
  estaRecebido: z.boolean().optional(),
  estaDeletado: z.boolean().optional(),
  idUsuario: z.string().cuid().optional(),
  idClasseLancamento: z.string().cuid().optional(),
});

export const createLucroValidator = z.object({
  titulo: z.string().min(3).max(255),
  valor: z.number().positive(),
  estaRecebido: z.boolean(),
  estaDeletado: z.boolean(),
  idUsuario: z.string().cuid(),
  idClasseLancamento: z.string().cuid(),
})