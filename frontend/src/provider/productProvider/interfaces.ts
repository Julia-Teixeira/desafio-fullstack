import { z } from "zod";

export const dataProduct = z.object({
    price: z.string(),
    color: z.string(),
    img: z.string().max(255, "Endereço da imagem ultrapassou o limite de 255 caracteres")
})

export const productInfo = dataProduct.extend({
    id: z.number(),

})

export const createProductSchema = z.object({
    name: z.string({
        required_error: "Nome obrigatório",
    }),
    brand: z.string({
        required_error: "Marca obrigatória",
    }),
    model: z.string({
        required_error: "Model obrigatório",
    }),

    data: dataProduct.array()
});

export const updateProductSchema = createProductSchema.omit({ data: true }).extend({
    productInfos: dataProduct.array().optional(),
}).partial()

export const returnProductSchema = createProductSchema.omit({ data: true }).extend({
    id: z.number(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    productInfos: dataProduct.extend({ id: z.number(),}).array()
});

export type TCreateProduct = z.infer<typeof createProductSchema>;
export type TUpdateProduct = z.infer<typeof updateProductSchema>;
export type TReturnProduct = z.infer<typeof returnProductSchema>;
export type TUpdateProductInfo = z.infer<typeof dataProduct>;
export type TProductInfo = z.infer<typeof productInfo>;

export interface ProductContextValues {
    getAllProducts: () => Promise<void>,
    products: TReturnProduct[],
    setProducts: React.Dispatch<React.SetStateAction<TReturnProduct[]>>,
    createProduct: (data: TCreateProduct) => Promise<void>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    product: TReturnProduct,
    setProduct: React.Dispatch<React.SetStateAction<TReturnProduct>>,
    getProduct: (id: number) => Promise<void>
    deleteProduct: (id: number) => Promise<void>,
    editProduct: (data: TUpdateProduct, id: number) => Promise<void>,
    deleteColor: (id: number) => Promise<void>,
    filteredProducts: TReturnProduct[],
    setFilteredProducts: React.Dispatch<React.SetStateAction<TReturnProduct[]>>,
    searchProduct: string
    setSearchProduct: React.Dispatch<React.SetStateAction<string>>,
    updateColor: (dataForm: TUpdateProductInfo, id: number) => Promise<void>
    createColor: (dataForm: TUpdateProductInfo, id: number) => Promise<void>
}