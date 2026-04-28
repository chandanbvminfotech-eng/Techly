import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const showUserProfile = async ({ userId }) => {
  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const userDetails = await User.findById(userId).select(
    "name email role avatar isActive",
  );
  if (userDetails.isActive === false) {
    throw new ApiError(400, "User is not active");
  }
  if (!userDetails) {
    throw new ApiError(400, "Unable to fetch user details");
  }
  return userDetails;
};

const updateUserProfile = async ({ userId, name, email, avatar }) => {
  if (!userId) {
    throw new ApiError(400, "User not found");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  
  const userCheck = await User.findById(userId);

  if (!userCheck) {
    throw new ApiError(400, "No Such user found");
  }
  if (userCheck.isActive === false) {
    throw new ApiError(400, "User is not active");
  }
  if (!name && !email && !avatar) {
    throw new ApiError(400, "At Least One field is necessary");
  }
    
  let updatedData={};
  if (name) {
    updatedData.name = name;
  }
  if (email) {
    updatedData.email = email;
    console.log(updatedData)
  }
  const avatarLocalPath = avatar?.path;
  if (avatarLocalPath) {
    const folderName = "avatars";
    const avatarImage = await uploadOnCloudinary(avatarLocalPath, folderName);
    console.log(avatarImage.public_id);
    updatedData.avatar = [
      { url: avatarImage.url, public_id: avatarImage.public_id },
    ];
  }
  
try {
  const userDetails = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!userDetails) {
    throw new ApiError(400, "Couldn't update the user details");
  }

  return userDetails;
} catch (error) {
  // Check for MongoDB duplicate key error (code 11000)
  if (error.code === 11000) {
    // Extract which field caused the duplicate error
    const field = Object.keys(error.keyPattern)[0];

    if (field === "email") {
      throw new ApiError(
        400,
        "Email already exists. Please use a different email.",
      );
    }

    throw new ApiError(
      400,
      `${field} already exists. Please use a different ${field}.`,
    );
  }
  // Re-throw other errors
  throw error;
}
};

export { showUserProfile, updateUserProfile };
