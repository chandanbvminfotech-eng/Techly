import express from "express";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/index.js";



const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();

