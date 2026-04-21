import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const addProductToCart = async ({ productId, userId, quantity }) => {
  // user clicks on add button ==> request is send with productId,quantity to post cart api
  // it checks validation of these ids and check if product exists in db
  // then we add the product to cart using create

  if (!productId || !quantity) {
    throw new ApiError(400, "ProductId and quantity is required");
  }
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  const product = await Product.findById(productId).select(
    "name description price stock",
  );
  if (!product) {
    throw new ApiError(400, "Product not found in db");
  }

  const cart = await Cart.findOne({ userId });

  let productToBeAdded;
  if (!cart) {
    productToBeAdded = await Cart.create({
      userId,
      items: [
        {
          productId,
          priceSnapshot: product.price,
          quantity,
        },
      ],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({
      productId,
      priceSnapshot: product.price,
      quantity,
    });
  }

  productToBeAdded = await cart.save();

  return productToBeAdded;
};

const getCartData = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(400, "Cart is empty");
  }
  return cart;
};

const deleteDataFromCart = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(400, "No Data to delete cart is empty");
  }
  cart.items = [];
  const deletedResult = await cart.save();
  return "Cart Cleared";
};

const deleteSingleProductDataFromCart = async ({ productId, userId }) => {
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!productId) {
    throw new ApiError(400, "ProductId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    throw new ApiError(400, "Invalid ProductId");
  }
  const cart = await Cart.findOne({ userId });
  const existingProduct = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (!existingProduct) {
    throw new ApiError(400, "Product is not in cart can't be removed");
  }
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );
  await cart.save();
  return "Success in deleting";
};

const updateQuantityInCart = async ({ productId, userId, quantity }) => {
  if (!productId || !quantity) {
    throw new ApiError(400, "ProductId and quantity is required");
  }
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    throw new ApiError(400, "Invalid ProductId");
  }
    const cart = await Cart.findOne({ userId });
    
    
};

export {
  addProductToCart,
  getCartData,
  deleteDataFromCart,
  deleteSingleProductDataFromCart,
};
