import { Request, Response } from "express";
import { IContractRequest, IContractResponse, contractCreateSchema } from "../interfaces/contracts.interfaces";
import { IClientRequest, clientCreatetSchema } from "../interfaces/clients.interfaces";
import ContractsService from "../services/contracts.service";
import { AppError } from "../error/error";

class ContractController {

    static async getAll(req: Request, res: Response): Promise<IContractResponse[]> {
        try {
            const contracts: IContractRequest[] = await ContractsService.findAll()

            return res.status(200).json(contracts)
        } catch (error) {

        }
    }

    static async create(req: Request, res: Response): Promise<IContractResponse> {
        try {
            const contract: IContractRequest = contractCreateSchema.parse(req.body)

            const newContract: IContractResponse = await ContractsService.create(contract)

            return res.status(200).json(newContract)

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                return res.status(400).json({ error: "Erro desconhecido ao criar Contrato." });
            }
        }

    }

}

export default ContractController