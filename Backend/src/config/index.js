import dotenv from "dotenv";
import path from "path";
import { ApiError } from "../utils/apiError.js";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(),`.env.${env}.local`);

dotenv.config({ path: envPath });

if (!process.env.MONGO_URI) {
  throw new ApiError(400,"provide a mongodb url for db connection")
}
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new ApiError(400,"Jwt token can't be empty please provide a token")
}

export const {
  PORT,
  MONGO_URI,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  FRONTEND_URL,
} = process.env;


