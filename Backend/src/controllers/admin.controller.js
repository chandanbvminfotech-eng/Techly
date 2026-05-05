import { approveSeller, blockUser, getAdminStats, getAllOrders, getAllUsers, getPendingSeller, rejectSeller, unBlockUser } from "../services/admin.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsersController = asyncHandler(async (req, res) => {
  const result = await getAllUsers({
    adminId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Fetched Successfully"));
});

const getAllOrdersController = asyncHandler(async (req, res) => {
  const result = await getAllOrders({
    adminId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Fetched Successfully"));
});

const BlockUserController = asyncHandler(async (req, res) => {
  const result = await BlockUser({
    currentAdminId: req.user._id,
    userId: req.params.id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Blocked Successfully"));
});

const UnblockUserController = asyncHandler(async (req, res) => {
  const result = await UnblockUser({
    currentAdminId: req.user._id,
    userId: req.params.id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Unblocked Successfully"));
});

const getAdminStatsController = asyncHandler(async(req,res) => {
  const result = await getAdminStats();
    return res
    .status(200)
    .json(new ApiResponse(200, result, "Admin Stats Fetched Successfully"));
})

const getPendingSellersController = asyncHandler(async(req,res) => {
  const result = await getPendingSeller();
    return res
    .status(200)
    .json(new ApiResponse(200, result, "Pending Sellers Fetched Successfully"));
})

const approveSellerController = asyncHandler(async(req,res) => {
  const result = await approveSeller({
    sellerId: req.params.id,  
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Seller Approved Successfully"));
});

const rejectSellerController = asyncHandler(async(req,res) => {
  const result = await rejectSeller({
    sellerId: req.params.id,  
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Seller Rejected Successfully"));
});

const blockUserController = asyncHandler(async(req,res) => {
  const result = await blockUser({
    currentAdminId: req.user._id,
    userId: req.params.id
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Blocked Successfully"));
});
const unBlockUserController = asyncHandler(async(req,res) => {
  const result = await unBlockUser({
    currentAdminId: req.user._id,
    userId: req.params.id
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User Unblocked Successfully"));
});

export { getAllUsersController, getAllOrdersController,BlockUserController,unBlockUserController,getAdminStatsController,getPendingSellersController,approveSellerController,rejectSellerController };
