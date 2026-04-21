import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { JWT_REFRESH_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";

// generate access,refreshtoken
const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(400, "Error Occured while generating tokens");
  }
};

const signUp = async (body) => {
  const { name, email, password, confirmPassword } = body;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return {
    user: createdUser,
  };
};

const signIn = async (body) => {
  const { email, password } = body;

  const userDetail = await User.findOne({ email });
  if (!userDetail) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await userDetail.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    userDetail.id,
  );

  const loggedInUser = await User.findById(userDetail.id).select(
    "-password -refreshToken",
  );

  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};

const signOut = async (user) => {
  if (!user?._id) {
    throw new ApiError(401, "Unauthorized");
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  if (!updatedUser) {
    throw new ApiError(400, "Error while logging out");
  }

  return;
};

const newAccessToken = async ({ body, cookies }) => {
  const incomingRefreshToken = cookies.refreshToken || body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "unauthorized");
  }
  const decodedToken = jwt.verify(incomingRefreshToken, JWT_REFRESH_SECRET);

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id,
  );

  return { accessToken, refreshToken };
};

export { signUp, signIn, signOut, newAccessToken };
