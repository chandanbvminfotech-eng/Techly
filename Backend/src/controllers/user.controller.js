import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import {
  applyForSeller,
  showUserProfile,
  updateUserProfile,
} from "../services/user.service.js";

const getUserData = asyncHandler(async (req, res) => {
  const result = await showUserProfile({
    userId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Fetched user details successfully"));
});

const updateUserProfileController = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const result = await updateUserProfile({
    userId: req.user._id,
    name,
    email,
    avatar: req.file,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User details updated successfully"));
});

const applyForSellerController = asyncHandler(async (req, res) => {
  const { storeName, storeDescription } = req.body;
  const result = await applyForSeller({
    userId: req.user._id,
    storeName,
    storeDescription,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Applied to become a seller"));
});

export { getUserData, updateUserProfileController, applyForSellerController };
