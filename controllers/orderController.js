const Order = require("../models/orderModel");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new order
const createOrder = async (req, res) => {
  const { userId, totalAmount, status } = req.body;
  try {
    const newOrder = await Order.create({ userId, totalAmount, status });
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, totalAmount, status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.userId = userId;
    order.totalAmount = totalAmount;
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
