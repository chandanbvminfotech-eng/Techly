import Cart from "../models/cart.model.js";
import { ApiError } from "../utils/apiError.js";
import mongoose, { get } from "mongoose";

const placeOrder = async ({ userId, addressId, paymentMethod }) => {
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  if (!addressId) {
    throw new ApiError(400, "At Least one address is necessary to order");
  }
  if (!paymentMethod) {
    throw new ApiError(400, "Payment method is needed");
  }
    //   console.log(userId.toString());
    const cartData = await Cart.findOne({ userId: userId });
    const populateCart = await cartData.populate("items.productId");
    populateCart.map((cart) => console.log(cart))
    // console.log(populateCart?.items?.[1]?.productId);
//   const cartData = await Cart.findOne({ userId: userId });
//   console.log("BEFORE POPULATE:", cartData?.items?.[0]?.productId); // Shows ObjectId

//   const populatedCart = await cartData.populate("items.productId");
//   console.log("AFTER POPULATE:", populatedCart?.items?.[0]?.productId);
};

export { placeOrder };
