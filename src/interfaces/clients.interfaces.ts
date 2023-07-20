import { z } from "zod";

export const clientCreatetSchema = z.object({
    name: z.string().max(60, { message: 'O nome do cliente é obrigatorio' }),
    cpf: z.string().max(11),
    rg: z.string().nullable(),
    phone: z.string().min(8, { message: 'O contato do cliente é obrigatorio' })
});
export const clientResponseSchema = z.object({
    id: z.union([z.number(), z.null()]),
    name: z.string(),
    cpf: z.string().max(11),
    rg: z.string().nullable(),
    rank: z.number().default(3),
    phone: z.string()
});

export type IClientRequest = z.infer<typeof clientCreatetSchema>
export type IClientResponse = z.infer<typeof clientResponseSchema>