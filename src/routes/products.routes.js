import express from 'express';
import { createProduct, deleteProduct, getOneProductById, getProducts, updateProduct } from '../controllers/products.controllers.js';
import { auth } from '../middlewares/auth.middleware.js';
const productsRouter = express.Router();

productsRouter.get('/products',  getProducts)
productsRouter.get('/products/:id', getOneProductById)
productsRouter.post('/products' , createProduct)
productsRouter.delete('/products/:id', deleteProduct)
productsRouter.patch('/products/:id', updateProduct)


export default productsRouter;
