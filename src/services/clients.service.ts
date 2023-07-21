import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { Address } from "../entities/address"; // Importe a entidade Address
import { AppError } from "../error/error";
import { IClientRequest, IClientResponse } from "../interfaces/clients.interfaces";

class ClientsServices {
    static clientRepository = AppDataSource.getRepository(Client);

    static async findAll(): Promise<IClientResponse[] | any> {
        const clients = await this.clientRepository.find({
            relations: ['contracts', 'address'], // Inclua a relação 'address'
        });

        return clients;
    }

    static async create(client: IClientRequest): Promise<IClientResponse | any> {
        const cpf = client.cpf;

        const existingClient = await this.clientRepository.findOne({
            where: { cpf },
        });

        if (existingClient) {
            throw new AppError("Já existe um cliente com esse CPF.", 409);
        }

        const newClient = this.clientRepository.create(client);
        await this.clientRepository.save(newClient);

        return newClient;
    }
}

export default ClientsServices;
