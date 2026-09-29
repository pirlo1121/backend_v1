import mongoose from "mongoose";

// crear Schema de productos
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, 'Name must have at least 3 characters'],
        maxLength: [100, 'Name must have at most 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than or equal to 0']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description must have at most 500 characters']
    }

});

// crear Modelo
export const productModel = mongoose.model('products', productSchema);
