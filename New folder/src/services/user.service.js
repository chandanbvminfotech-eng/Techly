import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";

const showUserProfile = async ({ user }) => {
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (user.isActive === false) {
    throw new ApiError(400, "User is not active");
  }

  const userDetails = await User.findById(user._id).select("name email role avatar");
  if (!userDetails) {
    throw new ApiError(400, "Unable to fetch user details");
  }

  return userDetails;
};

const updateUserProfile = async ({ user,body }) => {
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  if (user.isActive === false) {
    throw new ApiError(400, "User is not active");
  }
    const { name, email, avatar } = body;
  if (!name || !email || !avatar) {
    throw new ApiError(400, "All fields are necessary to fill");
  }
  const userDetails = await User.findByIdAndUpdate(
    user._id,
    {
      name: name,
      email: email,
      avatar: avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!userDetails) {
    throw new ApiError(400, "Couldn't update the user details");
  }
  return userDetails;
};

export { showUserProfile, updateUserProfile };
