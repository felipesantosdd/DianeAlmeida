import { Router } from "express";
import ClientControllers from "../controllers/clients.controllers";

const clientsRoutes = Router()

clientsRoutes.get('/', ClientControllers.getAll)

clientsRoutes.get('/:id', ClientControllers.findUnique)

clientsRoutes.patch('/:id', ClientControllers.updateUnique)

clientsRoutes.post('/', ClientControllers.create)

clientsRoutes.delete('/:id', ClientControllers.findUniqueCpf)

export default clientsRoutes