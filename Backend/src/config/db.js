import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

if(!MONGO_URI) {
    throw new Error("Please define the mongodb url connection string properly");
}

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        if (conn) {
            console.log("MongoDB connected");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

