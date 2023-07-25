import { Router } from "express";
import AddressControllers from "../controllers/address.controllers";

const addressRoutes = Router()

addressRoutes.get('/', AddressControllers.getAll)

addressRoutes.patch('/:id', AddressControllers.updateUnique)

addressRoutes.post('/', AddressControllers.create)

export default addressRoutes;