import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import {redis} from '../lib/redis.js'


const generateToken = (userId)=>{
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d"
    });

return {accessToken,refreshToken}; 
}

const storeRefreshToken = async(userId,refreshToken)=>{
    await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60); 
}

const setCookies = async(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:"strict",
        maxAge:15*60*1000,
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:"strict",
        maxAge:15*60*1000,
    })
}


export const signup = async(req,res)=>{
    try {
        
        const {email,password,name} = req.body; 
    const userExist = await User.findOne({
        email
    })
    if(userExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }e
    const user = await User.create({name,email,password}); 
    const {accessToken,refreshToken} =  generateToken(user._id)
    await storeRefreshToken(user._id,refreshToken); 
    setCookies(res,accessToken,refreshToken); 

   
     res.status(201).json({user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    },message:"user created successfully"})

    } catch (error) {
        console.log("error  : ", error) ; 
         res.status(500).json({
            message:"internal server error from signUP"
        })
    }

}

export const login  = async(req,res)=>{
try {
    const {email,password} = req.body; 
const user = await User.findOne({email}); 

if(user && (await user.comparePassword(password))){
  const {accessToken,refreshToken}  =  generateToken(user._id); 

  await storeRefreshToken(user._id,refreshToken);
  setCookies(res,accessToken,refreshToken); 

  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    role:user.role,
    message:"user login successfull"
  }); 

}else{
    res.status(401).json({
        message:"invalid email"
    })
}
    
} catch (error) {
    console.log("error from login : " , error ); 
    res.status(500).json({
        message:"internal server error from login"
    })
}
}

export const logout = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken; 
        if(refreshToken){
            const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET); 
            await redis.del(`refresh_token:${decoded.userId}
                `)

        }
        res.clearCookie("accessToken"); 
        res.clearCookie('refreshToken'); 
        res.clearCookie('jwt')
        res.status(201).json({
            message:"logout successfull"
        })
        
    } catch (error) {
        console.log("error from logout : ", error); 
        res.status(500).json({
            message:"server error from logout"
        })
    }
}

export const refreshToken = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken; 

        if(!refreshToken){
            return res.status(401).json({
                message:"no refresh token"
            })
        }
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET); 
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`); 

       if(storedToken !== refreshToken){
        return res.status(401).json({
            message:"invalid refresh token"
        })
       }
       const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"}); 

       res.cookie('accessToken', accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",sameSite:"strict",
        maxAge:15*60*1000,
    });

    res.json({
        message:"token refresh successfully"
    })
        
    } catch (error) {
        console.log("error from refresh token : ", error); 
        res.status(500).json({
            message:"internal server error : "
        })
    }
}

export const getProfile = async(req,res)=>{
    try {
        res.json(req.user); 

        
    } catch (error) {
        console.log("error : from getprofile ", error )
    }
}; 