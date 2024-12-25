import express from 'express'; 
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"
import productRoute from './routes/product.route.js'
import cloudinary from 'cloudinary'; 


dotenv.config(); 

const app = express(); 

const PORT = 5000 || process.env.PORT



app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth",authRoutes); 
app.use("/api/products",productRoute); 


app.listen(PORT,()=>{
    connectDB(); 
    console.log("server running on 5000");
}); 