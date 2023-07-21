import { Request, Response } from "express";
import { IAddresResponse, IAddressRequest, addressRequestSchema } from "../interfaces/address.interfaces";
import AddressService from "../services/address.service";

class AddressControllers {

    static async getAll(req: Request, res: Response): Promise<IAddresResponse[] | any> {
        try {
            const address = await AddressService.findAll()
            return res.status(200).json(address);
        } catch (error) {
            return res.status(400).json({ erro: error })
        }
    }

    static async create(req: Request, res: Response): Promise<IAddresResponse | any> {
        try {
            const address: IAddressRequest = addressRequestSchema.parse(req.body)

            const newAddress: IAddresResponse = await AddressService.create(address)

            return res.status(201).json(newAddress)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default AddressControllers;