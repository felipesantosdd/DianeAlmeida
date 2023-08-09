import { date } from "zod";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/products";
import { AppError } from "../error/error";
import { IProductRequest, IProductResponse } from "../interfaces/products.interfaces";

class ProductsServices {

    static ProductRepository = AppDataSource.getRepository(Product)

    static async findAll(): Promise<IProductResponse[] | any> {
        const products = await this.ProductRepository.find({
            order: { createdAt: 'DESC' }
        })

        products.map(product => this.updatePopularity(product.id))

        const response = await this.ProductRepository.find({ order: { popularity: 'DESC' } })

        return response

    }

    static async create(product: IProductRequest): Promise<IProductResponse | any> {

        const code = product.code

        const productExist = await this.ProductRepository.findOne({
            where: { code },
        })

        if (productExist) {
            throw new AppError("Este Produto ja esta cadastrado", 409)
        }

        const newProduct = this.ProductRepository.create(product);
        await this.ProductRepository.save(newProduct);

        return newProduct

    }

    static async updatePopularity(productID: string): Promise<void> {

        console.log(`productID: ${productID}`)

        const product = await this.ProductRepository.findOne({
            where: { id: productID }, relations: ['contracts']
        })

        product.popularity = product.contracts.length

        this.ProductRepository.save(product)

        return
    }

    static async updateUnique(productID: string, update: IProductRequest): Promise<IProductResponse | any> {
        const product = await this.ProductRepository.findOne({
            where: { id: productID }
        })

        console.log(update)

        if (!product) {
            throw new AppError('Produto Não Encontrado', 404)
        }

        product.price = update.price || product.price
        product.description = update.description || product.description
        product.modelo = update.modelo || product.modelo
        product.totalValue = update.price * 3 || product.totalValue

        await this.ProductRepository.save(product)

        return product
    }


    static async findUnique(id: string): Promise<IProductResponse | any> {

        const product = await this.ProductRepository.findOne({
            where: { id }, relations: ['contracts']
        })

        if (!product) {
            throw new AppError("Produto não encontrado", 404)
        }

        return product
    }

    static async deleteUnique(id: string): Promise<void> {



        await this.ProductRepository.delete(id)

        return
    }

}

export default ProductsServices;