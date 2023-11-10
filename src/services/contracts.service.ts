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
            order: { fechado: 'DESC' }
        });

        return contracts;
    }

    static async findUnique(id: string): Promise<IContractResponse | any> {
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

        if (!contract.extra) {
            contract.extra = 0
        }

        const newContract = this.contractRepository.create(contract);

        newContract.total += contract.extra

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
            newContract.total = contract.pagamento === 1 ? descont : total;

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
        try {
            const contract = await this.contractRepository.findOne({ where: { id: id }, relations: ['client', 'products'] },
            );

            if (!contract) {
                throw new AppError('Este contrato não existe', 404);
            }

            if (update.retirada) {
                contract.retirada = new Date(update.retirada);
            }

            if (update.devolucao) {
                contract.devolucao = new Date(update.devolucao);
            }

            // Atualiza os campos usando um operador ternário para evitar repetições
            contract.observacao = update.observacao ?? contract.observacao;
            contract.tipo = update.tipo ?? contract.tipo;
            contract.status = update.status ?? contract.status;
            contract.pagamento = update.pagamento ?? contract.pagamento;

            if (update.products && update.products.length > 0) {
                const newProductIDs = update.products.map(product => product.id);
                const newProducts = await this.ProductRepository.findByIds(newProductIDs);

                for (const newProduct of newProducts) {
                    await ProductsServices.updatePopularity(newProduct.id);
                }

                // Use um conjunto para remover duplicatas
                const existingProductIDs = (contract.products || []).map(existingProduct => existingProduct.id);
                const uniqueProductIDs = new Set([...existingProductIDs, ...newProductIDs]);

                // Atualiza os produtos do contrato com base nos IDs únicos
                contract.products = Array.from(uniqueProductIDs).map(id => newProducts.find(product => product.id === id));

            }

            // Calcula o valor total do contrato
            contract.total = (contract.products || []).reduce((acc, product) => acc + (product ? Number(product.price) : 0), 0);

            // Atualiza o campo 'extra' e o total se fornecido na atualização
            if (typeof update.extra !== 'undefined') {
                contract.extra = Number(update.extra);
                contract.total += Number(update.extra);
            }

            if (Number(contract.pagamento) === 1) {
                contract.total -= contract.total * 0.05;
            }

            // Salva as alterações no contrato
            await this.contractRepository.save(contract);

            return contract;
        } catch (error) {
            console.error(error);
            return error;
        }
    }



    static async deleteProduct(id: string, update: IContractUpdate): Promise<IContractResponse | any> {
        const contract = await this.contractRepository.findOne({
            where: { id },
            relations: ['client', 'products'],
        });

        if (!contract) {
            throw new AppError('Este contrato não existe', 404);
        }

        // Verifica se existe um produto a ser removido
        if (update.products && update.products.length > 0) {
            const removedProductId = update.products[0].id;

            ProductsServices.updatePopularity(removedProductId)

            // Remove o produto correspondente da lista de produtos existentes do contrato
            contract.products = contract.products.filter(product => product.id !== removedProductId);

            // Recalcula o valor total do contrato com base nos produtos restantes
            const total = Number(contract.products.reduce((acc, product) => acc + Number(product.price), 0)) + Number(contract.extra);

            const desconto = total - (total * 0.05);
            contract.total = contract.pagamento <= 2 ? desconto : total;
        }

        try {
            await this.contractRepository.save(contract);
            return contract;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    static async deleteUnique(id: string): Promise<void> {
        try {
            const contract = await this.contractRepository.findOne({
                where: { id }
            });

            if (!contract) {
                throw new AppError('Este contrato não existe', 404);
            }

            await this.contractRepository.remove(contract);

        } catch (error) {
            console.error('Erro ao excluir contrato:', error);
            throw new AppError('Erro ao excluir contrato', 500);
        }
    }


}

export default ContractsService;
