import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";

const getAllUsers = async ({ adminId }) => {
  if (!adminId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw new ApiError(400, "No Such User Found");
  }
  const adminCheck = await User.findById(adminId);
  if (!adminCheck.role) {
    throw new ApiError(400, "Unauthorized");
  }
  const users = await User.find({});
  return users;
};

const getAllOrders = async () => {
  const orders = await Order.find();
  const orderItem = await OrderItem.find()
    .populate({
      path: "productId",
      select: "_id name brand category images",
    })
    .select("_id quantity priceAtPurchase totalPrice");
  let itemsMap = {};
  for (let items of orderItem) {
    // console.log(items);
    const orderId = items.orderId
    if (!itemsMap[orderId]) {
        itemsMap[orderId] = []
    }
    itemsMap.push=items
  }
  return itemsMap;
};

export { getAllUsers, getAllOrders };
