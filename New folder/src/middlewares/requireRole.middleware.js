import { ApiError } from "../utils/apiError.js";

const requireRole = (...allowedroles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (!allowedroles.includes(req.user.role)) {
        throw new ApiError(403, "Access denied ");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default requireRole;
