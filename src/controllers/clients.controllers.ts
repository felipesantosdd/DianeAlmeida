import { Request, Response } from "express";
import { IClientRequest, IClientResponse, IClientUpdate, clientCreateSchema, clientUpdateSchema } from "../interfaces/clients.interfaces";
import ClientsServices from "../services/clients.service";
import { AppError } from "../error/error";
class ClientControllers {

    static async getAll(req: Request, res: Response): Promise<IClientResponse[] | any> {
        try {
            const clients: IClientResponse[] = await ClientsServices.findAll()
            return res.status(200).json(clients)
        } catch (error) {
            return res.status(400).json({ erro: error })
        }
    }

    static async findUnique(req: Request, res: Response): Promise<IClientResponse | any> {
        const clientId: string = req.params.id

        try {
            const client = await ClientsServices.findUnique(clientId)
            return res.status(200).json(client)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }
        }

    }

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const client: IClientRequest = clientCreateSchema.parse(req.body);
            const newClient = await ClientsServices.create(client);

            return res.status(201).json(newClient);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                return res.status(400).json({ error: error.message });
            }
        }
    }

    static async updateUnique(req: Request, res: Response): Promise<any> {
        const clientId: string = req.params.id

        try {
            const data: IClientUpdate = clientUpdateSchema.parse(req.body);
            const newClient = await ClientsServices.updateUnique(clientId, data);

            return res.status(200).json(newClient);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                return res.status(400).json({ error: error.message });
            }
        }
    }

    static async findUniqueCpf(req: Request, res: Response): Promise<any> {
        const userId: string = req.params.id
        try {
            await ClientsServices.deleteUnique(userId);

            return res.status(200).send()
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    message: error.message
                })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    }

}

export default ClientControllers;
