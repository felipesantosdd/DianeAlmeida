import { Router } from "express";
import ProductsControllers from "../controllers/products.controllers";

const productsRoutes = Router()

productsRoutes.get('/', ProductsControllers.getAll)

productsRoutes.post('/', ProductsControllers.create)

export default productsRoutes