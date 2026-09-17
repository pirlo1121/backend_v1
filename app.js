import express from 'express';
import productsRouter from './src/routes/products.routes.js';
import { connectDB } from './src/config/db.config.js';
const app = express();


connectDB();


app.use( express.json() );
app.use(productsRouter);




app.listen(3000,()=>{
    console.log('server running on port 3000');
})

