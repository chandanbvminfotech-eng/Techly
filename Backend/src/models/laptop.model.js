import mongoose, { Schema } from "mongoose";
import Product from "./product.model.js";

const laptopSchema = new Schema({
  ram: {
    type: String,
    required: true,
    enum: ["4GB", "8GB", "16GB", "32GB", "64GB"],
  },
  storage: {
    type: String,
    required: true,
    enum: ["256GB", "512GB", "1TB", "2TB", "4TB"],
  },
  storageType: {
    type: String,
    required: true,
    enum: ["SSD", "HDD"],
    default: "HDD",
  },
  processor: {
    type: String,
    required: true,
    trim: true,
  },
  gpu: {
    type: String,
    required: true,
    trim: true,
  },
  os: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ["Windows", "macOS", "Linux", "No OS"],
  },
  displaySize: {
    type: Number,
    required: true,
  },
  battery: {
    type: Number,
    required: true,
  },
  camera: { type: String, required: true,  enum:["2160p","1440p","1080p","720p"],default:"720p" },
  ports: {
    type: String,
    required: true,
  },
  connectivity: {
    type: String,
    required: true,
    enum: ["Wi-fi", "Bluetooth", "HDMI"],
  },
});

laptopSchema.index({ ram: 1 });
laptopSchema.index({ storage: 1 });
laptopSchema.index({ os: 1 });
laptopSchema.index({ storageType: 1 });

const Laptop = Product.discriminator("laptop", laptopSchema);
export default Laptop;
