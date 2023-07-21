import { Router } from "express";
import ContractController from "../controllers/contracts.controllers";

const contractRoutes = Router()

contractRoutes.get('/', ContractController.getAll)

contractRoutes.post('/', ContractController.create)

export default contractRoutes