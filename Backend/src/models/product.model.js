import mongoose, { Schema, model } from "mongoose";
import User from "./user.model.js";
const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          require: true,
        },
      },
    ],
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: { type: Boolean, default: true },
    ratings: {
      avg: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "category",
  },
);

productSchema.index({ brand: 1 });
productSchema.index({ isPublished: 1 });
productSchema.index({ sellerId: 1 });
productSchema.index({ name: "text", brand: "text", description: "text" }); // full-text search

const Product = model("Product", productSchema);
export default Product;
