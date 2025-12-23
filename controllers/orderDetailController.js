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

// Create new order detail (POS-ready)
const createOrderDetail = async (req, res) => {
  const { orderId, productId, qty, discount } = req.body;

  // Validate required fields
  if (!orderId || !productId) {
    return res
      .status(400)
      .json({ message: "orderId and productId are required" });
  }

  try {
    const newOrderDetail = await OrderDetail.create({
      orderId,
      productId,
      qty: qty ?? 1, // default 1 if missing
      discount: discount ?? 0, // default 0 if missing
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
  const { orderId, productId, qty, discount } = req.body;

  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail)
      return res.status(404).json({ message: "Order detail not found" });

    // Update fields safely
    orderDetail.orderId = orderId ?? orderDetail.orderId;
    orderDetail.productId = productId ?? orderDetail.productId;
    orderDetail.qty = qty ?? orderDetail.qty;
    orderDetail.discount = discount ?? orderDetail.discount;

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
