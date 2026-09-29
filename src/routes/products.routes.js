import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products.controllers.js';
import { auth } from '../middlewares/auth.middleware.js';
const productsRouter = express.Router();

productsRouter.get('/products', auth, getProducts)
productsRouter.post('/products', auth, createProduct)
productsRouter.delete('/products/:id', auth, deleteProduct)
productsRouter.patch('/products/:id', auth, updateProduct)


export default productsRouter