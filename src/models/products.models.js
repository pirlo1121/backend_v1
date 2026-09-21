import mongoose from "mongoose";

// crear Schema de productos
const productSchema = mongoose.Schema({

    name: String,
    price: Number,
    description: {
        type: String,
        require: true
    }

});

// crear Modelo
export const productModel = mongoose.model('products', productSchema);