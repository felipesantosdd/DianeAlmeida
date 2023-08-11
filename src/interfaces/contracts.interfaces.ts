import { z } from "zod";

export const contractCreateSchema = z.object({
    number: z.number(),
    retirada: z.string().nonempty(),
    devolucao: z.string(),
    observacao: z.string().nullable(),
    tipo: z.string().nullable(),
    fechado: z.string(),
    status: z.string(),
    pagamento: z.number(),
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
    devolucao: z.string(),
    observacao: z.string().nullable(),
    tipo: z.string(),
    fechado: z.string(),
    status: z.string(),
    value: z.number(),
    extra: z.number(),
    pagamento: z.number(),
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

export const contractUpdateSchema = z.object({
    retirada: z.string(),
    devolucao: z.string(),
    fechado: z.string(),
    observacao: z.string(),
    tipo: z.string(),
    status: z.string(),
    pagamento: z.number(),
    extra: z.number(),
    products: z.array(
        z.object({
            id: z.string()
        })
    ),
})


export type IContractRequest = z.infer<typeof contractCreateSchema>
export type IContractResponse = z.infer<typeof contractResponseSchema>
export type IContractUpdate = z.infer<typeof contractUpdateSchema>