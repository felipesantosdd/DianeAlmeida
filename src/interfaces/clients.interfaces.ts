import { z } from "zod";

export const clientCreateSchema = z.object({
    name: z.string().max(60, { message: 'O nome do cliente é obrigatorio' }),
    cpf: z.string().max(11),
    phone: z.string().min(8, { message: 'O contato do cliente é obrigatorio' })
});

export const clientResponseSchema = z.object({
    id: z.union([z.number(), z.null()]),
    name: z.string(),
    cpf: z.string().max(11),
    rank: z.number().default(3),
    phone: z.string(),
    createdAt: z.string()
});

export const clientUpdateSchema = z.object({
    rank: z.string().nullable(),
    phone: z.string().nullable(),
});

export type IClientRequest = z.infer<typeof clientCreateSchema>
export type IClientResponse = z.infer<typeof clientResponseSchema>
export type IClientUpdate = z.infer<typeof clientUpdateSchema>