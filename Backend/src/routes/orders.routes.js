import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const orderRouter = Router();


orderRouter.post("/", verifyJWT, createOrder);
// orderRouter.get("/");
// orderRouter.get("/:id");
// orderRouter.put("/:id/cancel");


export default orderRouter