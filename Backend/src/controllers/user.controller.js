import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError("User already exists", 400);
    }

    const user = await User.create({ name, email, password });

    if (!user) {
        throw new ApiError("Failed to create user", 500);
    }

    return res
      .status(201)
      .json(new ApiResponse(true, "User created successfully", user));
})