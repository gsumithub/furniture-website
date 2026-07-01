const express = require("express");
const router = express.Router();
const { createOrder, viewAllOrders, updateOrderStatus } = require("../../controller/web/orderController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/create", authMiddleware, createOrder);
router.get("/admin/view", viewAllOrders);
router.put("/admin/update-status/:id", updateOrderStatus);

module.exports = router;