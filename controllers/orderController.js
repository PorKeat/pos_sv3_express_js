const Order = require("../models/orderModel");

// Get all orders
const getAllOrders_Porkeat = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get order by ID
const getOrderById_Porkeat = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
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
const createOrder_Porkeat = async (req, res) => {
  const { customerName, totalAmount } = req.body;

  try {
    if (customerName.trim() === "") {
      return res.status(400).json({ message: "Customer name cannot be empty" });
    }
    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
    }
    if (Number.isNaN(totalAmount) || totalAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Total amount must be a positive number" });
    }
    const newOrder = await Order.create({
      customerName: customerName || "Walk-in",
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an order
const updateOrder_Porkeat = async (req, res) => {
  const { id } = req.params;
  const { customerName, totalAmount } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.customerName = customerName ?? order.customerName;
    order.totalAmount = totalAmount ?? order.totalAmount;

    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an order
const deleteOrder_Porkeat = async (req, res) => {
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
  getAllOrders_Porkeat,
  getOrderById_Porkeat,
  createOrder_Porkeat,
  updateOrder_Porkeat,
  deleteOrder_Porkeat,
};
