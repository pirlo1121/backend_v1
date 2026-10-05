import mongoose from "mongoose";
import { productModel } from "../models/products.models.js";

export async function getProducts(req, res) {
    try {

        const products = await productModel.find();

        if (products.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Products not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Products found',
            data: products
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })

    }
}

export async function createProduct(req, res) {
    try {
        const data = req.body;

        const product = await productModel.create(data);

        return res.status(201).json({
            ok: true,
            msg: 'Product created',
            data: product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })

    }
}

export async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({
                ok: false,
                msg: 'ID NOT VALID'
            });
        }

        const product = await productModel.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Product deleted',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })

    }
}

export async function updateProduct(req, res) {
    try {
        // capturar el id
        const id = req.params.id;
        const data = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({
                ok: false,
                msg: 'ID NOT VALID'
            });
        }

        const product = await productModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Product updated',
            data: product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })

    }
}
