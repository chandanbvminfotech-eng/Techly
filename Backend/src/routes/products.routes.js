import {Router} from "express"
import { addProduct } from "../controllers/product.controller.js";
import verifyJWT from ".."

const productRouter = Router();

productRouter.post("/",verifyJWT,requireRole ,addProduct)


export default productRouter