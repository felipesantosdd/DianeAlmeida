import { z } from "zod";

export const contractCreateSchema = z.object({
    number: z.number(),
    retirada: z.string().nonempty(),
    devolucao: z.string().nonempty(),
    observacao: z.string().nullable(),
    tipo: z.string(),
    status: z.string(),
    client: z.object({
        id: z.string(),
    }), products: z.array(
        z.object({
            id: z.string()
        })
    ),
})

export const contractResponseSchema = z.object({
    id: z.string().uuid(),
    number: z.number().min(1, { message: 'O numero do contrato é Obrigatorio' }),
    retirada: z.string().nonempty(),
    devolucao: z.string().nonempty(),
    observacao: z.string().nullable(),
    tipo: z.string(),
    status: z.string(),
    value: z.number(),
    popularity: z.number(),
    client: z.object({
        id: z.string(),
    }),
    products: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
        })
    ),
})


export type IContractRequest = z.infer<typeof contractCreateSchema>
export type IContractResponse = z.infer<typeof contractResponseSchema>