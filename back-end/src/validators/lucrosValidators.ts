import { z } from "zod";

export const getUniqueLucroValidator = z.object({
  id: z.string().cuid(),
});
export const updateLucroValidator = z.object({
  titulo: z.string().min(3).max(255).optional(),
  descricao: z.string().min(3).max(255).optional(),
  dataPrevista: z.string().optional(),
  valor: z.number().positive().optional(),
  estaRecebido: z.boolean().optional(),
  estaDeletado: z.boolean().optional(),
  idUsuario: z.string().cuid(),
});

export const createLucroValidator = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(3).max(255),
  dataPrevista: z.string(),
  valor: z.number().positive(),
  estaRecebido: z.boolean(),
  estaDeletado: z.boolean(),
  idUsuario: z.string().cuid(),
})