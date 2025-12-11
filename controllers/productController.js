const Product = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new product
const createProduct = async (req, res) => {
  const { productName, qty, price, discount, categoryId } = req.body;
  try {
    const newProduct = await Product.create({
      productName,
      qty,
      price,
      discount,
      categoryId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, qty, price, discount, categoryId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    product.productName = productName;
    product.qty = qty;
    product.price = price;
    product.discount = discount;
    product.categoryId = categoryId;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
