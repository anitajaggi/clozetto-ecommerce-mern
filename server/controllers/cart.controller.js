import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, color, size, quantity } = req.body;

    const userId = req.user.id; // Assuming user is authenticated

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found!", success: false });
    }

    // Check if user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if not exists
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (itemIndex > -1) {
      // If product exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({
        product: productId,
        image: product.images[0],
        name,
        price,
        color,
        size,
        quantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      message: "Product added to cart!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add to cart! Try again.",
      success: false,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [] } });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch cart!",
      success: false,
    });
  }
};

export const updateCart = async (req, res) => {
  const { productId, color, size, quantity } = req.body;
  const userId = req.user.id;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const result = await Cart.findOneAndUpdate(
      {
        user: userId,
        "items.product": productId,
        "items.color": color,
        "items.size": size,
      },
      {
        $set: { "items.$.quantity": quantity },
        $currentDate: { updatedAt: true },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ success: true, cart: result });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, color, size } = req.body;

    // 🕵️‍♂️ Extract actual ID if productId is an object
    const productIdStr =
      typeof productId === "object" && productId !== null
        ? productId._id
        : productId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found!", success: false });
    }

    if (productIdStr) {
      cart.items = cart.items.filter(
        (item) =>
          !(
            item.product.toString() === productIdStr &&
            item.color === color &&
            item.size === size
          )
      );
    } else {
      cart.items = [];
    }

    await cart.save();
    return res.status(200).json({
      message: productIdStr ? "Item removed from cart!" : "Cart cleared!",
      success: true,
    });
  } catch (error) {
    console.error("DELETE CART ERROR:", error);
    return res.status(500).json({
      message: "Failed to delete cart!",
      success: false,
    });
  }
};
