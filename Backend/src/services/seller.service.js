import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const getSellerProducts = async ({ sellerId, page = 1, limit = 12 }) => {
  const seller = await User.findById(sellerId);
  const skip = (page - 1) * limit;
  const [sellerItems, total] = await Promise.all([
    Product.find({ sellerId }).skip(skip).limit(limit),
    Product.countDocuments({ sellerId }),
  ]);

  return {
    products: sellerItems,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSellerOrder = async ({ sellerId }) => {
  const Orders = await OrderItem.find({ sellerId }).populate(
    "orderId",
    "status totalAmount createdAt address paymentMethod buyerId",
  );
  if (!Orders.length) {
    return [];
  }
  return Orders;
};

const updateOrderStatus = async ({ orderId, status, sellerId }) => {
  if (!status) {
    throw new ApiError(400, "Status is required");
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID");
  }
  const validStatuses = ["confirmed", "shipped", "delivered"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const orderItem = await OrderItem.findOne({ orderId, sellerId });
  if (!orderItem) {
    throw new ApiError(404, "Order item not found");
  }
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  const statusOrder = ["pending", "confirmed", "shipped", "delivered"];

  const currentIndex = statusOrder.indexOf(order.status);
  const newIndex = statusOrder.indexOf(status);
  if (newIndex <= currentIndex) {
    throw new ApiError(
      400,
      `Cannot change status from ${order.status} to ${status}`,
    );
  }
  order.status = status;
  await order.save();

  return order;
};

const getSellerStats = async ({ sellerId }) => {
  if (!sellerId) {
    throw new ApiError(400, "Seller ID is required");
  }
  const totalProducts = await Product.countDocuments({ sellerId });
  // console.log("Total Products:", totalProducts);

  const totalOrders = await OrderItem.countDocuments({ sellerId });
  // console.log("Total Orders:", totalOrders);

  const revenue = await OrderItem.aggregate([
    { $match: { sellerId: new mongoose.Types.ObjectId(sellerId) } },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$priceAtPurchase", "$quantity"] } },
      },
    },
  ]);
  const totalRevenue = revenue[0]?.total || 0;
  // console.log("Total Revenue:", totalRevenue);

  return { totalProducts, totalOrders, totalRevenue };
};


export { getSellerProducts, getSellerOrder, updateOrderStatus, getSellerStats };
