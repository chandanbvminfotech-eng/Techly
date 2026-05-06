import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";

const getAllUsers = async () => {
  const users = await User.find({}).select("-password -refreshToken");
  return users;
};

const blockUser = async ({ currentAdminId, userId }) => {
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "No Such User Found");
  }
  if (userId.toString() === currentAdminId.toString()) {
    throw new ApiError(400, "You cannot block yourself");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.isActive = false;
  await user.save();
  return user;
};
const unBlockUser = async ({ currentAdminId, userId }) => {
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "No Such User Found");
  }
  if (userId.toString() === currentAdminId.toString()) {
    throw new ApiError(400, "You cannot unblock yourself");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.isActive = true;
  await user.save();
  return user;
};

const getAllOrders = async () => {
  // Step 1: Fetch all orders with populated user and address
  const orders = await Order.find()
    .populate("_id", "name email")
    .sort({ createdAt: -1 });

  // Step 2: Fetch all order items with populated product details
  const orderItems = await OrderItem.find()
    .populate({
      path: "productId",
      select: "_id name brand category images price",
    })
    .select("_id orderId quantity priceAtPurchase totalPrice");

  // Step 3: Group order items by orderId
  const itemsMap = {};
  for (const item of orderItems) {
    const orderId = item.orderId.toString();
    if (!itemsMap[orderId]) {
      itemsMap[orderId] = [];
    }
    // Push clean item object
    itemsMap[orderId].push({
      _id: item._id,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase,
      totalPrice: item.totalPrice,
      product: item.productId
        ? {
            _id: item.productId._id,
            name: item.productId.name,
            brand: item.productId.brand,
            category: item.productId.category,
            image: item.productId.images?.[0]?.url || null,
            price: item.productId.price,
          }
        : null,
    });
  }

  // Step 4: Attach items to each order
  const ordersWithItems = orders.map((order) => {
    const orderObj = order.toObject();
    orderObj.items = itemsMap[orderObj._id.toString()] || [];
    return orderObj;
  });

  return ordersWithItems;
};

const getAdminStats = async () => {
  const totalUsers = await User.countDocuments({ role: "buyer" });


  const totalOrders = await Order.countDocuments();


  const totalSellers = await User.countDocuments({ role: "seller" });


  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);


  const pendingSellerApprovals = await User.countDocuments({
    role: "seller",
    "seller.status": "pending",
  });

  return {
    totalUsers,
    totalOrders,
    totalSellers,
    totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    pendingSellerApprovals,
  };
};

const getPendingSeller = async () => {
  const pendingSellers = await User.find({
    role: "seller",
    isVerified: false,
  }).select("_id name email");
  return pendingSellers;
};

const approveSeller = async ({ sellerId }) => {
  if (!sellerId) {
    throw new ApiError(400, "Seller ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    throw new ApiError(400, "Invalid Seller ID");
  }
  const seller = await User.findById(sellerId);
  if (!seller || seller.role !== "seller") {
    throw new ApiError(404, "Seller not found");
  }
  seller.isVerified = true;
  seller.seller.status = "approved";
  await seller.save();
  return seller;
};
const rejectSeller = async ({ sellerId }) => {
  if (!sellerId) {
    throw new ApiError(400, "Seller ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    throw new ApiError(400, "Invalid Seller ID");
  }
  const seller = await User.findById(sellerId);
  if (!seller || seller.role !== "seller") {
    throw new ApiError(404, "Seller not found");
  }
  seller.isVerified = false;
  seller.seller.status = "rejected";
  await seller.save();
  return seller;
};

export {
  getAllUsers,
  getAllOrders,
  blockUser,
  unBlockUser,
  getAdminStats,
  getPendingSeller,
  approveSeller,
  rejectSeller,
};
