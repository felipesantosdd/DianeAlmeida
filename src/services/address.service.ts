import { getManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/address";
import { IAddresResponse, IAddressRequest } from "../interfaces/address.interfaces";

class AddressService {
    static addressRepository = AppDataSource.getRepository(Address)

    static async findAll(): Promise<IAddresResponse[] | any> {
        const address = await this.addressRepository.find({
            relations: ["client"]
        })

        return address
    }

    static async create(address: IAddressRequest): Promise<IAddresResponse | any> {

        // Crie uma nova instância de endereço com os dados fornecidos
        const newAddress = this.addressRepository.create(address);

        // Execute a inserção utilizando o query builder
        const queryBuilder = this.addressRepository.createQueryBuilder().insert().values(newAddress);


        await queryBuilder.execute();

        return newAddress;
    }
}

export default AddressService