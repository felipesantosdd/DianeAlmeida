import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients";
import { Address } from "../entities/address"; // Importe a entidade Address
import { AppError } from "../error/error";
import { IClientRequest, IClientResponse, IClientUpdate } from "../interfaces/clients.interfaces";

class ClientsServices {
    static clientRepository = AppDataSource.getRepository(Client);

    static async findAll(): Promise<IClientResponse[] | any> {
        const clients = await this.clientRepository.find();

        return clients;
    }


    static async findUnique(id: string): Promise<IClientResponse | any> {
        const client: IClientResponse | any = await this.clientRepository.findOne({
            where: { id }, relations: ['contracts', 'address']
        })

        if (!client) {
            throw new AppError('Cliente não encontrado', 404);
        }

        return client;

    }

    static async updateUnique(id: string, data: IClientUpdate): Promise<IClientResponse | any> {
        const client: IClientResponse | any = await this.clientRepository.findOne({
            where: { id }
        })

        if (!client) {
            throw new AppError('Cliente não encontrado', 404);
        }

        client.phone = data.phone || client.phone
        client.rank = Number(data.rank) || client.rank

        await this.clientRepository.save(client);

        return client;

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

    static async deleteUnique(id: string): Promise<void> {
        const client = await this.findUnique(id);
        console.log(id)
        if (!client) {
            throw new AppError('Cliente não encontrado', 404);
        }
        await this.clientRepository.delete(id);

        return
    }
}

export default ClientsServices;
