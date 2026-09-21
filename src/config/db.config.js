import mongoose from 'mongoose';
import { env } from './env.config.js';


export async function connectDB() {

    try {
        await mongoose.connect(env.dbUrl);
        console.log('Conectado xd')
        
    } catch (error) {
        console.log(error)
        console.log('no se pudo conectar')
    }
    
}