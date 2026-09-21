import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products.controllers.js';
const productsRouter = express.Router();

productsRouter.get('/products',getProducts)
productsRouter.post('/products', createProduct)
productsRouter.delete('/products/:id', deleteProduct)
productsRouter.patch('/products/:id', updateProduct)


export default productsRouter