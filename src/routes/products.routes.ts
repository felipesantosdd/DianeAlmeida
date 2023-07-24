import { Router } from "express";
import ProductsControllers from "../controllers/products.controllers";

const productsRoutes = Router()

productsRoutes.get('/', ProductsControllers.getAll)

productsRoutes.get('/:id', ProductsControllers.findUnique)

productsRoutes.patch('/:id', ProductsControllers.updateUnique)

productsRoutes.post('/', ProductsControllers.create)

productsRoutes.delete('/:id', ProductsControllers.deleteUnique)

export default productsRoutes