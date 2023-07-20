import { Request, Response } from "express";
import { IClientRequest, IClientResponse, clientCreatetSchema } from "../interfaces/clients.interfaces";
import ClientsServices from "../services/clients.service";
import { AppError } from "../error/error";
class ClientControllers {

    static async getAll(req: Request, res: Response): Promise<IClientResponse[]> {
        try {
            const clients: IClientResponse[] = await ClientsServices.findAll()
            return res.status(200).json(clients)
        } catch (error) {
            return res.status(400).json({ erro: error })
        }
    }

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const client: IClientRequest = clientCreatetSchema.parse(req.body);
            const newClient = await ClientsServices.create(client);

            return res.status(201).json(newClient);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                return res.status(400).json({ error: "Erro desconhecido ao criar cliente." });
            }
        }
    }

}

export default ClientControllers;
