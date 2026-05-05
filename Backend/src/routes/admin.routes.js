import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import requireRole from "../middlewares/requireRole.middleware.js"
import { getAllOrdersController, getAllUsersController } from "../controllers/admin.controller.js";
const adminRouter = Router();

adminRouter.get("/users",verifyJWT,requireRole("admin"),getAllUsersController);
adminRouter.get("/orders",verifyJWT,requireRole("admin"),getAllOrdersController);


export default adminRouter;
