import { Router } from "express";
import { addProduct, deleteProduct, viewProduct } from "../controllers/product.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";
import upload from "../middlewares/multer.middleware.js"

const productRouter = Router();

productRouter.post("/", verifyJWT, requireRole("seller"), upload.array("images", 5), addProduct);

productRouter.get("/", viewProduct);

productRouter.delete("/:id",verifyJWT, deleteProduct);

export default productRouter;
