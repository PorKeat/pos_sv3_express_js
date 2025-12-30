const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/orderDetailController");

router.get("/", orderDetailController.getAllOrderDetails_Porkeat);
router.get("/:id", orderDetailController.getOrderDetailById_Porkeat);
router.post("/", orderDetailController.createOrderDetail_Porkeat);
router.put("/:id", orderDetailController.updateOrderDetail_Porkeat);
router.delete("/:id", orderDetailController.deleteOrderDetail_Porkeat);

module.exports = router;
