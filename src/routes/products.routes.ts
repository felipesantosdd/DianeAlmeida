import { Router } from "express";
import ProductsControllers from "../controllers/products.controllers";
import multer from 'multer';
import multerConfig from '../config/multer';

const productsRoutes = Router()

const upload = multer(multerConfig);

productsRoutes.get('/', ProductsControllers.getAll)

productsRoutes.get('/:id', ProductsControllers.findUnique)

productsRoutes.patch('/:id', ProductsControllers.updateUnique)

productsRoutes.post('/', ProductsControllers.create)

productsRoutes.delete('/:id', ProductsControllers.deleteUnique)

productsRoutes.patch('/image/:id', upload.single('file'), ProductsControllers.uploadImage)

productsRoutes.get('/image/find', ProductsControllers.getImage)

export default productsRoutes

