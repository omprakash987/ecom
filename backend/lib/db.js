import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL); 
        console.log("mongodb is connected"); 
    } catch (error) {
        console.log("error : ", error); 
        process.exit(1); 
    }
}