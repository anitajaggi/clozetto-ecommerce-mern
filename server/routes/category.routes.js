import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.put("/:catId", updateCategory);
router.delete("/:catDelId", deleteCategory);

export default router;
