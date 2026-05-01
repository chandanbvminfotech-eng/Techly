import { Router } from "express";
import { cancelOrderController, getOrderByIdController, getOrdersController, placeOrderController } from "../controllers/order.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const orderRouter = Router();


orderRouter.post("/", verifyJWT, placeOrderController);

orderRouter.get("/", verifyJWT, getOrdersController);
orderRouter.get("/:id",verifyJWT,getOrderByIdController);
orderRouter.put("/:id/cancel",verifyJWT,cancelOrderController);


export default orderRouter