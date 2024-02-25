import { z } from "zod";

const dataProduct = z.object({
    price: z.number(),
    color: z.string(),
})

const productInfo = dataProduct.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createProductSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    brand: z.string().nonempty("Marca é obrigatória"),
    model: z.string().nonempty("Modelo é obrigatório"),
    data: dataProduct.array()
});

export const returnProductSchema = createProductSchema.omit({ data: true }).extend({
    id: z.number(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    productInfos: productInfo.array()
});

export type TCreateProduct = z.infer<typeof createProductSchema>;
export type TReturnProduct = z.infer<typeof returnProductSchema>;

export interface ProductContextValues {
    getAllProducts: () => Promise<void>,
    products: TReturnProduct[],
}



