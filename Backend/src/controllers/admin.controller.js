import { getAllOrders, getAllUsers } from "../services/admin.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsersController = asyncHandler(async (req, res) => {
    const result = await getAllUsers({
      adminId:req.user._id
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Fetched Successfully"));
});

const getAllOrdersController = asyncHandler(async (req, res) => {
    const result = await getAllOrders({
      adminId:req.user._id
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Fetched Successfully"));
});

export {getAllUsersController,getAllOrdersController}
