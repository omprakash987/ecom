import express from 'express'; 
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import couponRoute from './routes/coupon.route.js'
import paymentRoute from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js'
import path from 'path'
import cors from 'cors'

dotenv.config(); 

const app = express(); 

const PORT = 5000 || process.env.PORT
const __dirname = path.resolve(); 

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};
app.use(cors(corsOptions))

app.use(express.json({limit:'15mb'}));
app.use(cookieParser()); 
app.use("/api/auth",authRoutes); 
app.use("/api/products",productRoute); 
app.use("/api/cart",cartRoute); 
app.use("/api/coupon",couponRoute); 
app.use("/api/payment",paymentRoute); 
app.use("/api/analytics",analyticsRoutes); 

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist"))); 
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend',"dist","index.html"))
})
}

app.listen(PORT,()=>{
    connectDB(); 
    console.log("server running on 5000");
}); 