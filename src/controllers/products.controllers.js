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
        product.password = undefined;

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

export async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        const product = await productModel.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'Product deleted',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}

export async function updateProduct(req, res) {
    try {
        // capturar el id
        const id = req.params.id;
        const data = req.body;

        const product = await productModel.findByIdAndUpdate(id, data, {new: true});

        res.json({
            ok: true,
            msg: 'Product updated',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'server internal error'
        })

    }
}