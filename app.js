import express from 'express';
import productsRouter from './src/routes/products.routes.js';
const app = express();



app.get('/',(req,res)=>{
    res.send('funciona!!!!');
})

app.use(productsRouter)



app.listen(3000,()=>{
    console.log('server running on port 3000');
})