import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())


app.use("/api/v1",routes);

app.get("/", (req, res) => {
    console.log("Test Route");
    res.send("Working home route");
})


export default app;