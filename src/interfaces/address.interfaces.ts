import { z } from "zod";

export const addressRequestSchema = z.object({
    city: z.string().max(50),
    street: z.string().max(50),
    number: z.string().max(50),
    state: z.string().max(50),
    zip: z.string().max(50).nullable(),
    district: z.string().max(50),
    reference: z.string().max(50).nullable(),
    client: z.object({
        id: z.string().uuid(),
    }),
})

export const addresResponseSchema = z.object({
    id: z.string().uuid(),
    city: z.string().max(50),
    street: z.string().max(50),
    number: z.string().max(50),
    state: z.string().max(50),
    zip: z.string().max(50),
    district: z.string().max(50),
    reference: z.string().max(50),
    client: z.object({
        id: z.string().uuid(),
        // Add any other properties that may exist in the Client entity
    }),
});

export const addressUpdateSchema = z.object({
    city: z.string().max(50),
    street: z.string().max(50),
    number: z.string().max(50),
    state: z.string().max(50),
    zip: z.string().max(50),
    district: z.string().max(50),
    reference: z.string().max(50)
});

export type IAddressRequest = z.infer<typeof addressRequestSchema>

export type IAddresResponse = z.infer<typeof addresResponseSchema>

export type IAddressUpdate = z.infer<typeof addressUpdateSchema>

