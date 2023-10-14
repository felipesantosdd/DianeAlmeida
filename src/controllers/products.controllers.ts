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

    static async findUnique(req: Request, res: Response): Promise<IProductResponse | any> {
        const id: string = req.params.id
        try {
            const product = await ProductsServices.findUnique(id)
            return res.status(200).json(product)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    }

    static async updateUnique(req: Request, res: Response): Promise<IProductResponse | any> {
        const id: string = req.params.id
        const data: IProductRequest = req.body
        try {
            const product: IProductRequest = await ProductsServices.updateUnique(id, data)

            return res.status(200).json(product)

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    }



    static async deleteUnique(req: Request, res: Response): Promise<void | any> {

        const id: string = req.params.id

        try {
            await ProductsServices.deleteUnique(id)
            return res.status(200).send()
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    }

    static async uploadImage(req: Request, res: Response): Promise<void | any> {
        try {
            const response = await ProductsServices.uploadImage(req, res)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }

    }

    static async getImage(req: Request, res: Response): Promise<any> {
        try {
            const name = req.body.image
            const image = await ProductsServices.getImage(name)
            return res.status(200).json(image)
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsControllers;