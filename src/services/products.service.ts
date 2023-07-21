import { AppDataSource } from "../data-source";
import { Product } from "../entities/products";
import { AppError } from "../error/error";
import { IProductRequest, IProductResponse } from "../interfaces/products.interfaces";

class ProductsServices {

    static ProductRepository = AppDataSource.getRepository(Product)

    static async findAll(): Promise<IProductResponse[] | any> {
        const products = await this.ProductRepository.find()

        return products

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

}

export default ProductsServices;