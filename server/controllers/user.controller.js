import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return res.status(400).json({
      message: "All fields are required!",
      success: false,
    });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      message: "Email already exists!",
      success: false,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  await newUser.save();
  return res.status(200).json({
    message: "Account created successfully!",
    success: true,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email & password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required!",
      success: false,
    });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Invalid Credentials",
      success: false,
    });
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid Credentials",
      success: false,
    });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set cookie with httpOnly & secure flag
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    // sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({
    message: "Login successful!",
    success: true,
    user: {
      username: user.username,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.json({
    message: "Logged out successfully!",
    success: true,
  });
};

export const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authenticated", success: false });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("username email");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};
