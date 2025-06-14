import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRoute from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRoute from "./routes/product.routes.js";
import cartRoute from "./routes/cart.routes.js";

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // 👈 allows cookies
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/productImages", express.static("productImages"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello I'm running now!",
    success: true,
  });
});

app.use("/api/user", userRoute);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
