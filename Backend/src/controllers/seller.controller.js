import {
  getSellerOrder,
  getSellerProducts,
  getSellerStats,
  updateOrderStatus,
} from "../services/seller.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getSellerProductsController = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await getSellerProducts({
    sellerId: req.user._id,
    page,
    limit,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "product details fetched successfully"));
});

const getSellerOrderController = asyncHandler(async (req, res) => {
  const result = await getSellerOrder({
    sellerId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "order details fetched successfully"));
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
  const result = await updateOrderStatus({
    sellerId: req.user._id,
    orderId: req.params.id,
    status: req.body.status,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "order status updated successfully"));
});

const getSellerStatsController = asyncHandler(async (req, res) => {
  const result = await getSellerStats({
    sellerId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "seller stats fetched successfully"));
});


export {
  getSellerProductsController,
  getSellerOrderController,
  updateOrderStatusController,
  getSellerStatsController,
};
