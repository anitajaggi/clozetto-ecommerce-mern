import express from "express";
import { isAuthenticated } from "../middlewares/authMiddlewares.js";
import {
  deleteCart,
  addToCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.put("/", isAuthenticated, updateCart);
router.delete("/", isAuthenticated, deleteCart);

export default router;
