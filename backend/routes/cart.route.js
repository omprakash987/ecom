

import Router from 'express'; 
import { protectRoute } from '../middleware/auth.middleware.js';
import { removeAllFromCart,
    addToCart,
    getCartProducts,
    updateQuantity

 } from '../controllers/cart.controller.js';

const router = Router(); 

router.post('/',protectRoute,addToCart); 
router.post('/',protectRoute,getCartProducts); 
router.delete('/',protectRoute,removeAllFromCart); 
router.put('/:id',protectRoute,updateQuantity); 



export default router; 
