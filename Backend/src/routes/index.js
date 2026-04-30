import express from "express";
import userRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";
import productRouter from "./products.routes.js";
import addressRouter from "./address.routes.js";
import cartRouter from "./cart.routes.js";
import orderRouter from "./orders.routes.js"

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/cart",cartRouter);
router.use("/addresses",addressRouter);
router.use("/orders",orderRouter);

export default router;
