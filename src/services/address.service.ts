import { getManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/address";
import { IAddresResponse, IAddressRequest, IAddressUpdate } from "../interfaces/address.interfaces";
import { AppError } from "../error/error";

class AddressService {
    static addressRepository = AppDataSource.getRepository(Address)

    static async findAll(): Promise<IAddresResponse[] | any> {
        const address = await this.addressRepository.find({
            relations: ["client"]
        })

        return address
    }

    static async updateUnique(id: string, data: IAddressUpdate): Promise<IAddresResponse | any> {

        const address = await this.addressRepository.findOne({
            where: { id }
        })

        if (!address) {
            throw new AppError("Address not found", 404)
        }

        address.city = data.city != "" ? data.city : address.city
        address.street = data.street != "" ? data.street : address.street
        address.number = data.number != "" ? data.number : address.number
        address.state = data.state != "" ? data.state : address.state
        address.zip = data.zip != "" ? data.zip : address.zip
        address.district = data.district != "" ? data.district : address.district
        address.reference = data.reference != "" ? data.reference : ""

        await this.addressRepository.save(address)

        return address

    }

    static async create(address: IAddressRequest): Promise<IAddresResponse | any> {

        function removeNonNumericCharacters(str) {
            return str.replace(/\D/g, '');
        }

        // Crie uma nova instância de endereço com os dados fornecidos
        const newAddress = this.addressRepository.create(address);

        // Execute a inserção utilizando o query builder
        const queryBuilder = this.addressRepository.createQueryBuilder().insert().values(newAddress);


        await queryBuilder.execute();

        return newAddress;
    }
}

export default AddressService