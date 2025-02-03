import { z } from "zod";

export const paginationValidator = z.object({
    page: z.string().transform((val) => parseInt(val, 10)).optional().default('1').refine(val => val > 0, {
        message: "Page must be a positive integer"
      }),
      limit: z.string().transform((val) => parseInt(val, 10)).optional().default('10').refine(val => val > 0, {
        message: "Limit must be a positive integer"
      }),
})