import express from "express";
import { addProductToCart, getUserCart,removeItem,updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addProductToCart);
router.get("/:userId", getUserCart);
router.put("/", updateQuantity);
router.delete("/", removeItem);


export default router;
