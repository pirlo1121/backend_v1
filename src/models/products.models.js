import mongoose from "mongoose";

// crear Schema de productos
const productSchema = mongoose.Schema({

    name: String,
    price: Number,
    description: String

});

// crear Modelo
export const productModel = mongoose.model('products', productSchema);