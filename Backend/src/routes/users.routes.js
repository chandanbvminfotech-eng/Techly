import User from "../models/user.model.js";
import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
    console.log("Get all users");
    res.json("Get all users" );
} )
userRouter.post("/",signUp)


export default userRouter;
