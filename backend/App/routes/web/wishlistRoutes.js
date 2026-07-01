const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require("../../controller/web/wishlistController");

const authMiddleware = require("../../middleware/authMiddleware");

router.post("/add", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.post("/remove", authMiddleware, removeFromWishlist);

module.exports = router;
