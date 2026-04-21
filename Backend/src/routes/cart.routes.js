import { Router } from "express";
import { addToCart, deleteCart, deleteProductFromCart, getCart } from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const cartRouter = Router();



cartRouter.get("/",verifyJWT,getCart)
cartRouter.post("/",verifyJWT,addToCart)
cartRouter.delete("/",verifyJWT,deleteCart)
cartRouter.delete("/:id",verifyJWT,deleteProductFromCart)
// cartRouter.put("/:id",verifyJWT,deleteProductFromCart)

export default cartRouter