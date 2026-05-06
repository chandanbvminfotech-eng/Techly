import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/requireRole.middleware.js";
import {
  approveSellerController,
  BlockUserController,
  getAdminStatsController,
  getAllOrdersController,
  getAllUsersController,
  getPendingSellersController,
  rejectSellerController,
  unBlockUserController,
} from "../controllers/admin.controller.js";
const adminRouter = Router();

adminRouter.get(
  "/users",
  verifyJWT,
  requireRole("admin"),
  getAllUsersController,
);
adminRouter.put(
  "/users/:id/block",
  verifyJWT,
  requireRole("admin"),
  BlockUserController,
);
adminRouter.put(
  "/users/:id/unblock",
  verifyJWT,
  requireRole("admin"),
  unBlockUserController,
);

adminRouter.get(
  "/sellers/pending",
  verifyJWT,
  requireRole("admin"),
  getPendingSellersController,
);

adminRouter.put(
  "/sellers/:id/approve",
  verifyJWT,
  requireRole("admin"),
  approveSellerController,
);
adminRouter.put(
  "/sellers/:id/reject",
  verifyJWT,
  requireRole("admin"),
  rejectSellerController,
);

adminRouter.get(
  "/orders",
  verifyJWT,
  requireRole("admin"),
  getAllOrdersController,
);

adminRouter.get(
  "/stats",
  verifyJWT,
  requireRole("admin"),
  getAdminStatsController,
);

export default adminRouter;
