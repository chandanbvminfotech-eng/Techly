import { Router } from "express";
import {
  addProduct,
  viewProducts,
  viewProduct,
  deleteProductController,
  updateProductController,

} from "../controllers/product.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.post(
  "/",
  verifyJWT,
  requireRole("seller"),
  upload.array("images", 5),
  addProduct,
);

productRouter.get("/", viewProducts);
productRouter.get("/:id", viewProduct);

productRouter.put("/:id", verifyJWT,requireRole("seller"),updateProductController);

productRouter.delete("/:id", verifyJWT, deleteProductController);

export default productRouter;
