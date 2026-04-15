import User from "../models/user.model.js";
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getUserData, updateUserProfileController } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
    console.log("Get all users");
    res.json("Get all users" );
} )
// userRouter.post("/",signUp)

userRouter.get("/profile", verifyJWT,getUserData);
userRouter.put("/profile", verifyJWT,updateUserProfileController);

export default userRouter;
