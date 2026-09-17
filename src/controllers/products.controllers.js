import { productModel } from "../models/products.models.js";

export async function getProducts(req, res) {
    try {
        const products = await productModel.find();

        if (products.length == 0) {
               return res.json({
                ok: false,
                msg: 'Products not founded'
            })} 

        return res.json({
            ok: true,
            msg: 'Products founded',
            data: products
        })



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export async function createProduct(req, res) {
    try {
        const data = req.body;

        const product = await productModel.create(data);

        res.json({
            ok: true,
            msg: 'product created',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export function deleteProduct(req, res) {
    try {

        
        res.json({
            ok: true,
            msg: 'Product deleted',
            data: 'Product'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export function updateProduct(req, res) {
    try {
        res.json({
            ok: true,
            msg: 'Product updated',
            data: 'Product'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}