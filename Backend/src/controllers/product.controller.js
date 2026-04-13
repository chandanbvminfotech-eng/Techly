import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../services/product.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addProduct = asyncHandler(async (req, res) => {
  const product = await createProduct(req);
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const viewProducts = asyncHandler(async (req, res) => {
  const result = await getProducts(req.query);
  return res.status(200).json(new ApiResponse(200, result, "Products fetched"));
});

const viewSingleProduct = asyncHandler(async (req, res) => {
  const result = await getProductById({
    productId: req.params.id,
    user: req.user,
  });
  return res.status(200).json(new ApiResponse(200, result, "Product fetched"));
});

const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct({
    productId: req.params.id,
    userId:req.user._id,
    role:req.user.role
  });
  return res.status(200).json(new ApiResponse(200,"Products deleted"));
});

const updateProductController = asyncHandler(async (req, res) => {
  const result = await updateProduct({
    productId: req.params.id,
    userId:req.user._id,
    role: req.user.role,
    body: req.body,
    files:req.files
  })
  return res.status(200).json(new ApiResponse(200, result, "Product updated"));
})



export {
  addProduct,
  viewProducts,
  deleteProductController,
  viewSingleProduct,
  updateProductController,
};
