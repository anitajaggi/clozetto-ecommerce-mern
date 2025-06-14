import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number },
    stock: { type: Number, required: true },
    description: { type: String },
    reviews: { type: Number },
    rating: { type: Number },
    images: { type: [String] },
    sizes: { type: [String] },
    colors: { type: [String] },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
