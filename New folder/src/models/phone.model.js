import mongoose, { Schema } from "mongoose";
import Product from "./product.model.js";

const phoneSchema = new Schema({
  ram: {
    type: String,
    required: true,
    enum: ["2GB", "4GB", "6GB", "8GB", "10GB", "12GB", "14GB", "16GB"],
  },
  storage: {
    type: String,
    required: true,
    enum: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
  },
  isExpandable: {
    type: Boolean,
    default: false,
  },
  processor: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ["android", "ios"],
    required:true
  },
  displaySize: {
    type: Number,
    required: true,
    minLength: 3,
    maxLength:7
  },
  battery: {
    type: Number,
    required: true,
    minLength: 1000,
    maxLength:10000
  },
  is5G: {
    type: Boolean,
    default: false,
  },
  camera: { type: String, required: true, trim: true },
  simSlots: {
    type: Number,
    enum: [1, 2],
    default: 2,
  },
});

phoneSchema.index({ ram: 1 });
phoneSchema.index({ storage: 1 });
phoneSchema.index({ os: 1 });
phoneSchema.index({ is5G: 1 });

const Phone = Product.discriminator("phone", phoneSchema);
export default Phone;
