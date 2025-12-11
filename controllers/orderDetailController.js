const OrderDetail = require("../models/orderDetailModel");

// Get all order details
const getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get order detail by ID
const getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json(orderDetail);
  } catch (err) {
    console.error("Error fetching order detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new order detail
const createOrderDetail = async (req, res) => {
  const { orderId, productId, quantity, price } = req.body;
  try {
    const newOrderDetail = await OrderDetail.create({
      orderId,
      productId,
      quantity,
      price,
    });
    res.status(201).json(newOrderDetail);
  } catch (err) {
    console.error("Error creating order detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an order detail
const updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const { orderId, productId, quantity, price } = req.body;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail)
      return res.status(404).json({ message: "Order detail not found" });
    orderDetail.orderId = orderId;
    orderDetail.productId = productId;
    orderDetail.quantity = quantity;
    orderDetail.price = price;
    await orderDetail.save();
    res.json(orderDetail);
  } catch (err) {
    console.error("Error updating order detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an order detail
const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    await orderDetail.destroy();
    res.json({ message: "Order detail deleted successfully" });
  } catch (err) {
    console.error("Error deleting order detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
