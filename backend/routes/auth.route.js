import { Router } from "express";
import { signup,login ,logout, refreshToken,getProfile} from "../controllers/auth.controller.js";

const router = Router(); 

router.post('/signup',signup); 
router.post('/login',login); 
router.post('/logout',logout); 
router.post('/refresh-token',refreshToken); 
router.get('/profile',getProfile); 





export default router;