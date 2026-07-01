const Wishlist = require("../../model/wishlistModel");

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
