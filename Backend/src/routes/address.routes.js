import { Router } from "express";
import {
  addAddress,
  viewAddresses,
  deleteAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const addressRouter = Router();


addressRouter.get("/",verifyJWT,viewAddresses);
addressRouter.post("/",verifyJWT,addAddress);
addressRouter.delete("/:id", verifyJWT, deleteAddressController);
addressRouter.put("/:id", verifyJWT,updateAddressController);

export default addressRouter;