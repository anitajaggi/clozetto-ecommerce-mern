import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = new Category({ category });
    await newCategory.save();
    return res.status(200).json({
      message: "Category added successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! Try again.",
      success: false,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({ status: true });
    return res.status(200).json({ categories, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch categories!",
      success: false,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { catId } = req.params;
    const { category } = req.body;
    const updateCat = await Category.findById(catId);
    updateCat.category = category || updateCat.category;
    await updateCat.save();
    
    return res.status(200).json({
      message: "Category updated successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update! Try again.",
      success: false,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { catDelId } = req.params;
    const category = await Category.findById(catDelId);
    if (!category) {
      return res.status(404).json({
        message: "Not Found!",
        success: false,
      });
    }
    category.status = false;
    await category.save();
    return res.status(200).json({
      message: "Category removed successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove! Try again.",
      success: false,
    });
  }
};
