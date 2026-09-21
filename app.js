import express from 'express';
import productsRouter from './src/routes/products.routes.js';
import usersRouter from './src/routes/users.routes.js';
import { connectDB } from './src/config/db.config.js';
import { env } from './src/config/env.config.js';
const app = express();


connectDB();


app.use( express.json() );
app.use(productsRouter);
app.use(usersRouter);



app.use((req,res)=>{
    res.status(404).json({ok: false, msg: 'Route not found'})
})




app.listen(env.port,()=>{
    console.log('server running on port 3000');
})

