import Laptop from "../models/laptop.model.js";
import Phone from "../models/phone.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const viewProducts = asyncHandler(async (req, res) => {
//     const products = await Product.findMany({});

//     if (!products) {
//         throw new ApiError(500,"Internal Server Error! Products not found")
//     }

// })

const addProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "seller" || req.user.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }
  const { name, description, brand, type } = req.body;

  if (!["laptop", "phone"].includes(type)) {
    throw new ApiError(400, "Invalid product type");
  }

  const baseData = {
    name,
    price: Number(price),
    brand,
    description,
    sellerId: req.user._id,
  };

  let product;
  if (type === "phone") {
    const { ram, storage, processor, os, displaySize, battery, camera } =
      req.body;
    product = await Phone.create({
      ...baseData,
      ram,
      storage,
      processor,
      os,
      displaySize: Number(displaySize),
      battery: Number(battery),
      camera,
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
    } = req.body;
    product = await Laptop.create({
      ...baseData,
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
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});


export {
    addProduct
} 