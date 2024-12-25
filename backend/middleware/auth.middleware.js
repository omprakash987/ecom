import jwt, { decode } from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectRoute = async(req,res,next)=>{

    try {
        const accessToken = req.cookies.accessToken; 
        if(!accessToken){
            return res.status(401).json({
                message:"unauthorized "
            })
        }

        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET); 
        const user  = await User.findById(decoded.userId).select("-password"); 

        if(!user){
            return res.status(401).json({message:"user not found"}); 

        }
        req.user = user; 
        next(); 
        
    } catch (error) {
        console.log("error from auth middleware : ", error); 
        res.status(500).json({
            message:"internal server error"
        })
    }
}


export const adminRoute = (req,res,next)=>{
    if(req.user&& req.user.role==="admin"){
        next(); 
    }else{
        return res.status(403).json({message:"access denied"})
    }
}