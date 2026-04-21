import mongoose, { Schema, model } from "mongoose";
import Product from "./product.model.js";
import User from "./user.model.js";

const cartItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 10,
    },
    priceSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

cartSchema.virtual("totalAmount").get(function () {
  return this.items.reduce(
    (sum, item) => sum + item.priceSnapshot * item.quantity,
    0,
  );
});

cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

const Cart = model("Cart", cartSchema);
export default Cart;
