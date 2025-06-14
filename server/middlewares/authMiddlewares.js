import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // 🔥 Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized! No token provided.",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized! User not found.",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token!",
      success: false,
    });
  }
};
