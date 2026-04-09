import fs from "fs"
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_SECRET,CLOUDINARY_API_KEY } from "../config/index.js";


cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:CLOUDINARY_API_KEY,
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
    fs.unlinkSync(localFilePath)                                                  //delete from file from local
    return response;
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);                                                //delete from file from local
    }
    console.error("Error in uploading image", err);
  }
};

const deleteFromCloudinary = async (databaseFilePath) => {
  try {
    if (!databaseFilePath) {
      throw new ApiError(400, "Please provide a file path to delete");
    }
    const spreadedUrl = databaseFilePath.split("/");
    const getPublicId = spreadedUrl[spreadedUrl.length - 1];
    const publicId = getPublicId.split(".")[0];

    const response = await cloudinary.uploader.destroy(publicId);

    console.log("Deleted from cloudinary");

    if (fs.existsSync(databaseFilePath)) {
      fs.unlinkSync(databaseFilePath);
    }
    return response;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

export {uploadOnCloudinary,deleteFromCloudinary}