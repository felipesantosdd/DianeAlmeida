import { Router } from "express";
import ContractController from "../controllers/contracts.controllers";

const contractRoutes = Router()

contractRoutes.get('/', ContractController.getAll)

contractRoutes.get('/:id', ContractController.findUnique)

contractRoutes.patch('/:id', ContractController.updateUnique)

contractRoutes.post('/', ContractController.create)

contractRoutes.delete('/:id', ContractController.deleteUnique)

export default contractRoutes