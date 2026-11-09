import express from 'express';
import { createProduct, deleteProduct, getOneProductById, getProducts, updateProduct } from '../controllers/products.controllers.js';
import { auth, isAdmin } from '../middlewares/auth.middleware.js';
const productsRouter = express.Router();

// rutas publicas: cualquiera puede ver los productos
productsRouter.get('/products',  getProducts)
productsRouter.get('/products/:id', getOneProductById)

// rutas privadas: primero auth (¿hay token?) y luego isAdmin (¿es admin?)
productsRouter.post('/products' , auth, isAdmin, createProduct)
productsRouter.delete('/products/:id', auth, isAdmin, deleteProduct)
productsRouter.patch('/products/:id', auth, isAdmin, updateProduct)



export default productsRouter;
