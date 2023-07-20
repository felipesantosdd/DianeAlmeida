import { Router } from "express";
import ContractController from "../controllers/contracts.controllers";

const contractRoutes = Router()

contractRoutes.post('/', ContractController.create)

export default contractRoutes