const Category = require("../models/categoryModel");

// Get all categories
const getAllCategories_Porkeat = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get category by ID
const getCategoryById_Porkeat = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new category
const createCategory_Porkeat = async (req, res) => {
  // console.log("BODY:", req.body.name);
  // console.log("FILE:", req.file);

  const { name } = req.body;
  const image = req.file;

  try {
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: "Category name already exists" });
    }

    const newCategory = await Category.create({
      name,
      icon: image ? `/images/${image.filename}` : null,
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a category
const updateCategory_Porkeat = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const category = await Category.findByPk(id);
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.name = name;
    await category.save();

    res.json(category);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a category
const deleteCategory_Porkeat = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCategories_Porkeat,
  getCategoryById_Porkeat,
  createCategory_Porkeat,
  updateCategory_Porkeat,
  deleteCategory_Porkeat,
};
