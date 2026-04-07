import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(),`.env.${env}.local`);


dotenv.config({ path: envPath });


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


