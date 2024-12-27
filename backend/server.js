import express from 'express'; 
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import couponRoute from './routes/coupon.route.js'
import paymentRoute from './routes/payment.route.js'


dotenv.config(); 

const app = express(); 

const PORT = 5000 || process.env.PORT



app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth",authRoutes); 
app.use("/api/products",productRoute); 
app.use("/api/cart",cartRoute); 
app.use("/api/coupon",couponRoute); 
app.use("/api/payment",paymentRoute); 

app.listen(PORT,()=>{
    connectDB(); 
    console.log("server running on 5000");
}); 