import { ApiError } from "../utils/apiError.js";

const requireVerifiedSeller = (req, res, next) => {
  try {
    if (!req.user.isVerified) {
      throw new ApiError(401, "Your seller account is not yet approved");
    }
    console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
};

export default requireVerifiedSeller;
