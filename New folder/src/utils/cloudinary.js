import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
} from "../config/index.js";
import { ApiError } from "./apiError.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new ApiError(400, "No file path provided");
  }
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "products",
    });

    return response;
  } catch (error) {
    throw new ApiError(500, "Cloudinary upload failed");
  } finally {
    
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new ApiError(400, "Public ID is required");
  }

  try {
    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok" && response.result !== "not found") {
      throw new ApiError(500, "Failed to delete image from Cloudinary");
    }

    return response;
  } catch (error) {
    throw new ApiError(500, "Cloudinary deletion failed");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

// To search a image in cloudinary via public_id
// const result = await cloudinary.search
//   .expression("juhylzumwfjbxxigzvxg")
//   .execute()
//   .catch((error) => console.error(error));
