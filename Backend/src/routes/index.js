import express from "express";
import userRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";
import productRouter from "./products.routes.js";

const router = express.Router();


router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products",productRouter)


export default router;