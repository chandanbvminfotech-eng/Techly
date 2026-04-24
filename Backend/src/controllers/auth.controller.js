import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  newAccessToken,
  signIn,
  signOut,
  signUp,
} from "../services/auth.service.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/cookie.config.js";

// SignUp
const registerUser = asyncHandler(async (req, res) => {
  const result = await signUp(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, result, "User created successfully"));
});

// SignIn
const loginUser = asyncHandler(async (req, res) => {
  const result = await signIn(req.body);
  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  // };
  return res
    .status(200)
    .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
    .json(new ApiResponse(200, result, "User signed in successfully"));
});

// SignOut
const logoutUser = asyncHandler(async (req, res) => {
  console.log("Cookies");
  await signOut(req.user);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

// Generate new Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const result = await newAccessToken({
    body: req.body,
    cookies: req.cookies,
  });

  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  // };

  return res
    .status(200)
    .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
    .json(new ApiResponse(200, result, "Access token refreshed"));
});

const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "You are not logged in");
  }
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken",
  );
  if (!user) {
    throw new ApiError(401, "Not Loggeed In");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user accessed successfully"));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, getMe };
