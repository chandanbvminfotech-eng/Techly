import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())


app.use("/api/v1",router);

app.use((err,req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({success:false,statusCode,message})
})



export default app;