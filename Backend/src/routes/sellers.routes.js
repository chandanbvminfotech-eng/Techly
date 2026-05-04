import { Router } from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import requireRole from '../middlewares/requireRole.middleware.js';
import { getSellerOrderController, getSellerProductsController, getSellerStatsController, updateOrderStatusController } from '../controllers/seller.controller.js';

const sellerRouter = Router();

sellerRouter.get("/products",verifyJWT,requireRole("seller"),getSellerProductsController);
sellerRouter.get(
    "/orders",
  verifyJWT,
  requireRole("seller"),
  getSellerOrderController
);
sellerRouter.put(
    "/orders/:id/status",
  verifyJWT,
  requireRole("seller"),
  updateOrderStatusController,
);

sellerRouter.get("/stats",verifyJWT,requireRole("seller"),getSellerStatsController);


export default sellerRouter;
