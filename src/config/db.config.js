import mongoose from 'mongoose';

const urlDB = 'mongodb://localhost:27017/store';

export async function connectDB() {

    try {
        await mongoose.connect(urlDB);
        console.log('Conectado xd')
        
    } catch (error) {
        console.log(error)
        console.log('no se pudo conectar')
    }
    
}