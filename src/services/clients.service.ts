import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { AppError } from "../error/error";
import { IClientRequest, IClientResponse } from "../interfaces/clients.interfaces";

class ClientsServices {
    static clientRepository = AppDataSource.getRepository(Client);

    static async findAll(): Promise<IClientResponse[]> {
        const clients = await ClientsServices.clientRepository.find();

        return clients
    }

    static async create(client: IClientRequest): Promise<IClientResponse> {
        const cpf = client.cpf;
        const rg = client.rg;

        const existingClient = await ClientsServices.clientRepository.findOne({
            where: [{ cpf }, { rg }],
        });

        if (existingClient) {
            throw new AppError("Já existe um cliente com esses dados.", 409);
        }

        const newClient = ClientsServices.clientRepository.create(client);
        await ClientsServices.clientRepository.save(newClient);

        return newClient;
    }
}

export default ClientsServices;
