import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

import { productImage } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", productImage, createProduct);
router.get("/", getProducts);
router.delete("/:proDelId", deleteProduct);
router.put("/:productId", productImage, updateProduct);

export default router;
