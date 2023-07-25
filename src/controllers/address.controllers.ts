import { Request, Response } from "express";
import { IAddresResponse, IAddressRequest, IAddressUpdate, addressRequestSchema, addressUpdateSchema } from "../interfaces/address.interfaces";
import AddressService from "../services/address.service";
import { AppError } from "../error/error";

class AddressControllers {

    static async getAll(req: Request, res: Response): Promise<IAddresResponse[] | any> {
        try {
            const address = await AddressService.findAll()
            return res.status(200).json(address);
        } catch (error) {
            return res.status(400).json({ erro: error })
        }
    }

    static async updateUnique(req: Request, res: Response): Promise<IAddresResponse | any> {
        try {

            const id: string = req.params.id
            const update: IAddressUpdate = addressUpdateSchema.parse(req.body)

            const addres: IAddresResponse = await AddressService.updateUnique(id, update)

            return res.status(200).json(addres)

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                return res.status(400).json({ error: error.message });
            }
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