import { z } from "zod";

const ProductRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    modelo: z.string(),
    color: z.string(),
    code: z.number(),
    price: z.number(),
    totalValue: z.number(),
});

const ProductResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    modelo: z.string(),
    color: z.string(),
    code: z.number(),
    price: z.number(),
    totalValue: z.number(),
    contracts: z.array(z.string()),
    image: z.string()
});


type IProductRequest = z.infer<typeof ProductResponseSchema>;
type IProductResponse = z.infer<typeof ProductResponseSchema>;

export { IProductRequest, IProductResponse, ProductRequestSchema, ProductResponseSchema };
