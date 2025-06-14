import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, mrp, description, category, stock, sizes, colors } =
      req.body;

    if (!name || !price || !mrp || !category || !stock) {
      return res.status(400).json({
        message: "Name, Price, MRP, Stock, and Category are required!",
        success: false,
      });
    }

    // Initialize an empty array for images
    let formattedImages = [];

    // If files are uploaded, convert their paths to full URLs
    if (req.files && req.files.length > 0) {
      formattedImages = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/${file.path.replace(
            /\\/g,
            "/"
          )}`
      );
    }

    // If user provides image URLs in JSON, include them
    if (req.body.images) {
      const imageUrls = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      formattedImages.push(...imageUrls);
    }

    const newProduct = new Product({
      name,
      price,
      mrp,
      description,
      category,
      stock,
      images: formattedImages, // Store both uploaded & direct image URLs
      sizes,
      colors,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully!",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create product! Try again.",
      success: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: true });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products! Please wait.",
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { proDelId } = req.params;
    const product = await Product.findById(proDelId);

    product.status = false;
    await product.save();
    return res.status(200).json({
      message: "Product removed successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove! Try again.",
      success: false,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, mrp, description, category, stock, sizes, colors } =
      req.body;

    // Find the existing product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
      });
    }

    // Update product fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (mrp) product.mrp = mrp;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    // Update sizes & colors (ensuring they are stored as arrays)
    if (sizes) {
      product.sizes = Array.isArray(sizes) ? sizes : [sizes];
      product.markModified("sizes"); // Tell Mongoose that sizes changed
    }
    if (colors) {
      product.colors = Array.isArray(colors) ? colors : [colors];
      product.markModified("colors"); // Tell Mongoose that colors changed
    }

    // Handle Image Updates (Only overwrite if new images are uploaded)
    if (req.files && req.files.length > 0) {
      const formattedImages = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/${file.path.replace(
            /\\/g,
            "/"
          )}`
      );
      product.images = formattedImages;
      product.markModified("images");
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update product! Try again.",
      success: false,
    });
  }
};
