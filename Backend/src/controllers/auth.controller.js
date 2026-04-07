import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, passwordHash } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const user = await User.create({ name, email, passwordHash });

  if (!user) {
    throw new ApiError("Failed to create user", 500);
  }

  return res
    .status(201)
    .json(new ApiResponse(true, user,"User created successfully"));
});



export const signIn = asyncHandler(async (req, res) => {
  const { email, passwordHash } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  if (user.passwordHash !== passwordHash) {
    throw new ApiError("Invalid credentials", 401);
  }

  return res.status(200).json(new ApiResponse(true, user, "User signed in successfully"));
  
})