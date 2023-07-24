import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { Contract } from "../entities/contracts";
import { Product } from "../entities/products";
import { AppError } from "../error/error";
import { IContractRequest, IContractResponse } from "../interfaces/contracts.interfaces";
import ProductsServices from "./products.service";

class ContractsService {
    static contractRepository = AppDataSource.getRepository(Contract);
    static clientRepository = AppDataSource.getRepository(Client);
    static ProductRepository = AppDataSource.getRepository(Product);

    static async findAll(): Promise<IContractResponse[] | any> {
        const contracts = await this.contractRepository.find({
            relations: ['client', 'products'],
        });

        const clients = await this.clientRepository.find();

        return contracts;
    }

    static async create(contract: IContractRequest): Promise<IContractResponse | any> {
        const contractNumber = contract.number;

        const existContract = await this.contractRepository.findOne({
            where: { number: contractNumber },
        });

        if (existContract) {
            throw new AppError('Um contrato com esse número já existe!', 409);
        }

        const newContract = this.contractRepository.create(contract);

        newContract.products.forEach(async (product) => {
            ProductsServices.updatePopularity(product.id)
        });

        // Associar os produtos ao novo contrato
        if (contract.products && contract.products.length > 0) {
            const products = await this.ProductRepository.findByIds(contract.products);
            newContract.products = products;

            // Calcular o valor total com base nos preços dos produtos
            const total = products.reduce((acc, product) => acc + Number(product.price), 0);
            newContract.total = total;
        } else {
            // Se não houver produtos associados, o total será 0
            newContract.total = 0;
        }

        try {
            await this.contractRepository.save(newContract);
            return newContract;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
}

export default ContractsService;
