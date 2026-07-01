const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
} = require("../../controller/web/cartController");

const authMiddleware = require("../../middleware/authMiddleware");

// ✅ ADD
router.post("/add", authMiddleware, addToCart);

// ✅ GET
router.get("/", authMiddleware, getCart);

// ✅ REMOVE ITEM
router.post("/remove", authMiddleware, removeFromCart);

// ✅ UPDATE QUANTITY
router.post("/update", authMiddleware, updateCartQuantity);

module.exports = router;