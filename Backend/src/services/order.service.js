import { application } from "express";
import Address from "../models/address.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js"
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import mongoose, { get } from "mongoose";
import Product from "../models/product.model.js";

const getPopulatedCart = async (userId) => {
  const cart = Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "name price images brand stock sellerId",
  });
  return await cart;
};

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

  const result = await getPopulatedCart(userId);
  if (result.items.length < 1) {
    throw new ApiError(400, "Empty cart add something to order");
  }

  for (let item of result.items) {
    if (item.productId.stock < item.quantity) {
      throw new ApiError(
        400,
        `${item.productId.name} is out of stock or insufficient quantity`,
      );
    }
  }
  const address = await Address.findById(addressId);
  if (!address || address.userId.toString() !== userId.toString()) {
    throw new ApiError(404, "Address not found");
  }

  const orderPlace = await Order.create({
    buyerId: userId,
    totalAmount: result.totalAmount,
    address,
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "cod",
  });
  if (!orderPlace) {
    throw new ApiError(400, "Error in placing order try after sometime");
  }

  const orderItems = result.items.map((item) => ({
    orderId: orderPlace._id,
    productId: item.productId._id,
    sellerId: item.productId.sellerId,
    priceAtPurchase: item.priceSnapshot,
    quantity: item.quantity,
    productName: item.productId.name,
    productImage: item.productId.images[0]?.url,
  }));

  const orderItemCheck = await OrderItem.insertMany(orderItems);
  if (!orderItemCheck) {
    throw new ApiError(400,"Error in")
  }
  const stockUpdates = result.items.map((item) =>
    Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: -item.quantity },
    }),
  );

  await Promise.all(stockUpdates);
  await Cart.findOneAndUpdate({ userId }, { items: [] })

  return orderPlace;
};

const getOrders = async ({ buyerId }) => {
  if (!buyerId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(buyerId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  const orders = await Order.find({ buyerId }).select("-__v");
  if (!orders) {
    return [];
  }

  const orderIds = orders.map(o => o._id)
  const items = await OrderItem.find({orderId:{$in:orderIds}})
  return {orders,items};
};

const getOrderById = async ({ buyerId, orderId }) => {
  if (!buyerId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(buyerId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  if (!orderId) {
    throw new ApiError(400, "OrderId can't be empty");
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID");
  }
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new ApiError(400, "No Such Order Found");
  }
  if (order.buyerId.toString() !== buyerId.toString()) {
    throw new ApiError(403, "Unauthorized to view this order");
  }
  const items = await OrderItem.find({orderId:orderId});
  return {order,items};
};

const cancelOrder = async ({ buyerId, orderId }) => {
  if (!buyerId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(buyerId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  if (!orderId) {
    throw new ApiError(400, "OrderId can't be empty");
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID");
  }
  const order = await Order.findById( orderId );
  if (!order) {
    throw new ApiError(400, "No Such Order Found");
  }
  if (order.buyerId.toString() !== buyerId.toString()) {
    throw new ApiError(403, "Unauthorized to view this order");
  }
   if (["cancelled"].includes(order.status)) {
     throw new ApiError(
       400,
       `Order cannot be cancelled as it is already ${order.status}`,
     );
   }
  const items = await OrderItem.find({orderId})
  order.status = "cancelled"
  const stockUpdates = items.map((item) =>
    Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: item.quantity },
    }),
  );
  await Promise.all(stockUpdates)
  await order.save();
  return order;
};

export { placeOrder, getOrders, getOrderById,cancelOrder };
