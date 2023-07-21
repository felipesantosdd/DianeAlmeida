import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { Contract } from "../entities/contracts";
import { AppError } from "../error/error";
import { IContractRequest, IContractResponse } from "../interfaces/contracts.interfaces";

class ContractsService {
    static contractRepository = AppDataSource.getRepository(Contract);
    static clientRepository = AppDataSource.getRepository(Client);

    static async findAll(): Promise<IContractResponse[] | any> {
        const contracts: IContractResponse[] = await this.contractRepository.find({
            relations: ['client'],
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
        try {
            await this.contractRepository.save(newContract);
            return newContract;
        } catch (error) {
            throw new AppError('Erro ao salvar o novo contrato.', 500);
        }
    }
}

export default ContractsService;
