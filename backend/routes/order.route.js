
import { protectRoute } from "../middleware/auth.middleware.js";
import Order from "../models/order.model.js";

import { Router } from "express";

const router = Router(); 

router.get("/my-orders", protectRoute, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log("error from order fetching : ", error); 
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router