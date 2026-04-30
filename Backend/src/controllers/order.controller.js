import { placeOrder } from "../services/order.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
    const { addressId, paymentMethod } = req.body;
    const result = await placeOrder({
      userId: req.user._id,
      addressId,
      paymentMethod,
    });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "order Placed"));
});

export { createOrder };

