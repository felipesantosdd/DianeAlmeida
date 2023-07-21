import { Request, Response } from "express";
import { IProductRequest, IProductResponse, ProductRequestSchema } from "../interfaces/products.interfaces";
import ProductsServices from "../services/products.service";
import { AppError } from "../error/error";

class ProductsControllers {

    static async getAll(req: Request, res: Response): Promise<IProductResponse[] | any> {
        try {
            const products = await ProductsServices.findAll()

            return res.status(200).json(products)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async create(req: Request, res: Response): Promise<IProductResponse | any> {
        try {
            const product: IProductRequest = ProductRequestSchema.parse(req.body)

            const newProduct: IProductResponse = await ProductsServices.create(product)

            return res.status(200).json(newProduct)

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    }


}

export default ProductsControllers;