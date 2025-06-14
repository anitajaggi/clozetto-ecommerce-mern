import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getCurrentUser);

export default router;
