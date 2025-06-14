import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    //   role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
