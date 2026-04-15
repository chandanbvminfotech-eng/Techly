import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  newAccessToken,
  signIn,
  signOut,
  signUp,
} from "../services/auth.service.js";

// SignUp
const registerUser = asyncHandler(async (req, res) => {
  const result = await signUp(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, result, "User created successfully"), true);
});

// SignIn
const loginUser = asyncHandler(async (req, res) => {
  const result = await signIn(req.body);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res
    .status(200)
    .cookie("accessToken", result.accessToken, options)
    .cookie("refreshToken", result.refreshToken, options)
    .json(new ApiResponse(200, result, "User signed in successfully"));

  // return res
  //   .status(200)
  //   .cookie("accessToken", result.accessToken, options)
  //   .cookie("refreshToken", result.refreshToken, options)
  //   .json(
  //     new ApiResponse(
  //       200,
  //       result,
  //       "User signed in successfully",
  //     ),
  //   );
});

// SignOut
const logoutUser = asyncHandler(async (req, res) => {
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

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", result.accessToken, options)
    .cookie("refreshToken", result.refreshToken, options)
    .json(new ApiResponse(200, result, "Access token refreshed"));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
