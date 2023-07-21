import { AppDataSource } from "../data-source";
import { Contract } from "../entities/contracts";
import { AppError } from "../error/error";
import { IContractRequest, IContractResponse } from "../interfaces/contracts.interfaces";

class ContractsService {
    static contractRepository = AppDataSource.getRepository(Contract)

    static async findAll(): Promise<IContractResponse[]> {
        const contracts: IContractResponse[] = await this.contractRepository.find()

        return contracts
    }


    static async create(contract: IContractRequest): Promise<IContractResponse> {
        const number = contract.number

        const existContract = await this.contractRepository.findOne({
            where: [{ number }]
        })

        if (existContract) {
            throw new AppError('um contrato com esse numero já existe!', 409)
        }

        const newContract = this.contractRepository.create(contract)
        await this.contractRepository.save(newContract)

        return newContract
    }
}

export default ContractsService;