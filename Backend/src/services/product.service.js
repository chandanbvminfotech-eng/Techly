import Laptop from "../models/laptop.model.js";
import Phone from "../models/phone.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createProduct = async (req) => {
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

  const imagesCollection = results
    .filter((r) => r !== null)
    .map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

  const baseData = {
    name,
    price: Number(price),
    brand,
    description,
    sellerId: req.user._id,
    images: imagesCollection,
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

  return product;
};

const getProducts = async (query) => {
  let {
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
  } = query;

  page = Number(page);
  limit = Number(limit);
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
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      throw new ApiError(400, "Invalid sellerId");
    }
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

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProductById = async ({ productId, user }) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }
  if (!product.isPublished) {
    const isOwner = user && product.sellerId.toString() === user._id.toString();
    const isAdmin = user?._role === "admin";
    if (!isOwner || !isAdmin) {
      throw new ApiError(403, "Product Not Available");
    }
  }
  return product;
};

const deleteProduct = async ({ productId, userId, role }) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const isOwner = product.sellerId.toString() === userId.toString();
  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not allowed to delete this product");
  }

  if (product.images && product.images.length > 0) {
    const deletePromises = product.images.map((img) =>
      deleteFromCloudinary(img.public_id),
    );

    await Promise.all(deletePromises);
  }

  await Product.findByIdAndDelete(productId);

  return { message: "Product deleted successfully" };
};

const updateProduct = async ({ productId, userId, role, body }) => {

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }


  const isOwner = product.sellerId.toString() === userId.toString();
  const isAdmin = role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not allowed to update this product");
  }


  const allowedFields = [
    "name",
    "description",
    "brand",
    "price",
    "stock",
    "ram",
    "storage",
    "processor",
    "os",
    "displaySize",
    "battery",
    "camera",
    "gpu",
    "ports",
    "connectivity",
  ];

  const updateData = {};

  for (const key of Object.keys(body)) {
    if (allowedFields.includes(key)) {
      updateData[key] = body[key];
    }
  }

  let updatedProduct;


  if (product.category === "laptop") {
    updatedProduct = await Laptop.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
  } else if (product.category === "phone") {
    updatedProduct = await Phone.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
  } else {
    updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  return updatedProduct;
};

export {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
};
