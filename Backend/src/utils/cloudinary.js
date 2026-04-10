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
  try {
    if (!localFilePath) {
      return res.status(400).json({ msg: "Please provide a file to upload" });
    }
    const response = await cloudinary.uploader //upload images in products folder
      .upload(localFilePath, {
        resource_type: "auto",
        folder: "products",
      })
      .catch((error) => console.error(error));
    fs.unlinkSync(localFilePath); //delete from file from local
    return response;
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); //delete from file from local
    }
    return new ApiError(401, "Image not uploaded");
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new ApiError(400, "Please provide a file path to delete");
    }

    const response = await cloudinary.uploader.destroy(publicId);

    console.log("Deleted from cloudinary");

    return response;
  } catch (err) {
    return new ApiError(401, "Image not deleted");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

// To search a image in cloudinary via public_id
// const result = await cloudinary.search
//   .expression("juhylzumwfjbxxigzvxg")
//   .execute()
//   .catch((error) => console.error(error));
