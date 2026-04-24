import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWT_ACCESS_SECRET } from "../config/index.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    // Stop here! asyncHandler will catch this and send it to your error middleware
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, JWT_ACCESS_SECRET);
    const user = await User.findById(decodedToken?._id).select("_id role");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export default verifyJWT;
