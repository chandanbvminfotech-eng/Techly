import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUser);
authRouter.post("/login", validate(loginSchema), loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.get("/me",verifyJWT,getMe);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
