import express from "express";
import userRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";

const router = express.Router();


router.use("/users", userRouter);
router.use("/auth", authRouter);


export default router;