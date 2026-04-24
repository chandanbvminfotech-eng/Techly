import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import { showUserProfile, updateUserProfile } from "../services/user.service.js";

// export const signUp = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         throw new ApiError("User already exists", 400);
//     }

//     const user = await User.create({ name, email, password });

//     if (!user) {
//         throw new ApiError("Failed to create user", 500);
//     }

//     return res
//       .status(201)
//       .json(new ApiResponse(true, "User created successfully", user));
// })

const getUserData = asyncHandler(async (req, res) => {
  const result = await showUserProfile({
    user: req.user,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Fetched user details successfully"));
});

const updateUserProfileController = asyncHandler(async (req, res) => {
    const result = await updateUserProfile({
        user: req.user,
        body:req.body
   })
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User details updated successfully"));
});

export { getUserData,updateUserProfileController };
