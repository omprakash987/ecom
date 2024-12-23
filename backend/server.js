import express from 'express'; 
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'

dotenv.config(); 

const app = express(); 
const PORT = 5000 || process.env.PORT


app.use("/api/auth",authRoutes); 

app.listen(PORT,()=>{
    console.log("server running on 5000");
}); 

