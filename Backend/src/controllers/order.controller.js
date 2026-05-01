import { cancelOrder, getOrderById, getOrders, placeOrder } from "../services/order.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const placeOrderController = asyncHandler(async (req, res) => {
  const { addressId, paymentMethod } = req.body;
  const result = await placeOrder({
    userId: req.user._id,
    addressId,
    paymentMethod,
  });
  return res.status(200).json(new ApiResponse(200, result, "order Placed"));
});

const getOrdersController = asyncHandler(async (req, res) => {
  const result = await getOrders({
    buyerId: req.user._id,
  });
  return res.status(200).json(new ApiResponse(200, result, "order Placed"));
});

const getOrderByIdController = asyncHandler(async (req, res) => {
  const result = await getOrderById({
    buyerId: req.user._id,
    orderId: req.params.id,
  });
  return res.status(200).json(new ApiResponse(200, result, "order Placed"));
});

const cancelOrderController = asyncHandler(async (req, res) => {
  const result = await cancelOrder({
    buyerId: req.user._id,
    orderId: req.params.id,
  });
  return res.status(200).json(new ApiResponse(200, result, "order Placed"));
});

export { placeOrderController,getOrdersController ,getOrderByIdController,cancelOrderController};

