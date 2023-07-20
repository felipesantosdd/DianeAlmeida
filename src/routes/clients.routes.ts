import { Router } from "express";
import ClientControllers from "../controllers/clients.controllers";

const clientsRoutes = Router()

clientsRoutes.get('/', ClientControllers.getAll)

clientsRoutes.post('/', ClientControllers.create)

export default clientsRoutes