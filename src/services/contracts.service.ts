import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { Contract } from "../entities/contracts";
import { Product } from "../entities/products";
import { AppError } from "../error/error";
import { IContractRequest, IContractResponse, IContractUpdate } from "../interfaces/contracts.interfaces";
import ProductsServices from "./products.service";

class ContractsService {
    static contractRepository = AppDataSource.getRepository(Contract);
    static clientRepository = AppDataSource.getRepository(Client);
    static ProductRepository = AppDataSource.getRepository(Product);

    static async findAll(): Promise<IContractResponse[] | any> {
        const contracts = await this.contractRepository.find({
            order: { createdAt: 'DESC' }
        });

        return contracts;
    }

    static async findUnique(id: string, update: IContractUpdate): Promise<IContractResponse | any> {
        const contract = await this.contractRepository.findOne({
            where: { id }, relations: ['client', 'products'],
        })

        if (!contract) {
            throw new AppError('Este contrato não existe', 404)
        }

        return contract

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

            const descont = total - (total * 0.05)
            newContract.total = contract.pagamento <= 2 ? descont : total;

            console.log('total:', total)
            console.log('total - 5%:', total - (total * 0.05))
            console.log('pagamento:', contract.pagamento)
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

    static async updateUnique(id: string, update: IContractUpdate): Promise<IContractResponse | any> {


        const contract = await this.contractRepository.findOne({
            where: { id }, relations: ['client', 'products'],
        });

        if (!contract) {
            throw new AppError('Este contrato não existe', 404);
        }

        contract.retirada = update.retirada != "" ? new Date(update.retirada) : contract.retirada
        contract.devolucao = update.devolucao != "" ? new Date(update.devolucao) : contract.devolucao
        contract.observacao = update.observacao || contract.observacao
        contract.tipo = update.tipo || contract.tipo
        contract.status = update.status || contract.status,
            contract.pagamento = update.pagamento || contract.pagamento


        if (update.products && update.products.length > 0) {
            // Obter os produtos existentes do contrato
            const existingProducts = contract.products || [];

            existingProducts.map(product => ProductsServices.updatePopularity(product.id))

            // Obter os detalhes dos produtos novos com base nos IDs fornecidos
            const newProducts = await this.ProductRepository.findByIds(update.products);

            // Atualizar a lista de produtos do contrato combinando os produtos existentes e novos
            contract.products = [...existingProducts, ...newProducts];

            // Calcular o valor total com base nos preços dos produtos atualizados

        }

        const total = contract.products.reduce((acc, product) => acc + Number(product.price), 0);

        const descont = total - (total * 0.05)

        contract.total = contract.pagamento <= 2 ? descont : total;

        try {
            await this.contractRepository.save(contract);
            return contract;
        } catch (error) {
            throw new AppError(error.message, 500);
        }



    }

    static async deleteUnique(id: string): Promise<void> {
        const contract = await this.contractRepository.findOne({
            where: { id }
        })

        if (!contract) {
            throw new AppError('Este contrato não existe', 404)
        }

        await this.contractRepository.delete(contract)

        return
    }
}

export default ContractsService;
