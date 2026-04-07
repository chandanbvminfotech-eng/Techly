import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const warehouseAddressSchema = new mongoose.Schema(
  {
    line: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [50, "Name must be less than 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      minLength: [10, "Phone number must be at least 10 characters long"],
    },
    passwordHash: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["buyer", "admin", "seller"],
      default: "buyer",
    },
    seller: {
      storeName: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ["none", "pending", "approved", "rejected"],
        default: "none",
      },
      storeDescription: {
        type: String,
        default: null,
      },
      storeLogo: {
        type: String,
        default: null,
      },
      warehouseAddress: {
        type: warehouseAddressSchema,
        default: null,
      }
    },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?_=20150327203541",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);




const User = mongoose.model("User", userSchema);

export default User;
