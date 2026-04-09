import Laptop from "../models/laptop.model.js";
import Phone from "../models/phone.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary,deleteFromCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";

// const viewProducts = asyncHandler(async (req, res) => {
//   const products = await Product.findMany({});

//   if (!products) {
//     throw new ApiError(500, "Internal Server Error! Products not found");
//   }
// });

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, type, price, images } = req.body;
  if (!name || !price || !brand) {
    throw new ApiError(400, "Missing required fields");
  }

  if (!["laptop", "phone"].includes(type)) {
    throw new ApiError(400, "Invalid product type");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one image is necessary");
  }

  const files = req.files;
  const uploadmultiple = files.map((file) => uploadOnCloudinary(file.path));
  console.log("All images uploaded");
  const results = await Promise.all(uploadmultiple);

  const imageUrls = results.filter((r) => r !== null).map((r) => r.secure_url);

  const baseData = {
    name,
    price: Number(price),
    brand,
    description,
    sellerId: req.user._id,
    images: imageUrls,
  };

  let product;
  try {
    if (type === "phone") {
      const {
        ram,
        storage,
        processor,
        os,
        displaySize,
        battery,
        camera,
        stock,
      } = req.body;
      product = await Phone.create({
        ...baseData,
        ram,
        storage,
        processor,
        os,
        displaySize: Number(displaySize),
        battery: Number(battery),
        camera,
        stock,
      });
    }

    if (type === "laptop") {
      const {
        ram,
        storage,
        storageType,
        processor,
        gpu,
        os,
        displaySize,
        battery,
        camera,
        ports,
        connectivity,
        stock,
      } = req.body;
      product = await Laptop.create({
        ...baseData,
        ram,
        storage,
        storageType,
        processor,
        gpu,
        os: os?.toLowerCase(),
        displaySize,
        battery,
        camera,
        ports,
        connectivity,
        stock,
      });
    }
  } catch (error) {
    throw new ApiError(500, error.message || "Error while saving product");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const viewProduct = asyncHandler(async (req, res) => {
  const {
    type,
    brand,
    ram,
    storage,
    minPrice,
    maxPrice,
    page = 1,
    limit = 3,
    search,
    sort,
    category,
    minRating,
    sellerId,
  } = req.query;

  const filter = {
    isPublished: true,
  };
  if (search) filter.$text = { $search: search };
  if (type) filter.type = type;
  if (brand) filter.brand = brand;
  if (ram) filter.ram = ram;
  if (storage) filter.storage = storage;
  if (category) filter.category = category;
  if (sellerId) {
    filter.sellerId = new mongoose.Types.ObjectId(sellerId);
  }

  if (minRating) {
    filter["ratings.avg"] = { $gte: Number(minRating) };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }


  const skip = (page - 1) * limit;

  let sortOption = { createdAt: -1 };
  if (sort === "price") sortOption = { price: 1 };
  if (sort === "-price") sortOption = { price: -1 };

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  return res.status(200).json(new ApiResponse(200, { products }));
});


const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "seller" && req.user.role !== "admin") {
    throw new ApiError(403,"Unauthorized")
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(400,"Invalid product id")
  }

  console.log(req.user)


})

export { addProduct, viewProduct, deleteProduct };
