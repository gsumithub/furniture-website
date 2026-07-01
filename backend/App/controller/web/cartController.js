const Cart = require("../../model/cartModel");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ UPDATE QUANTITY
const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ THIS LINE IS CRITICAL
module.exports = { addToCart, getCart, removeFromCart,
  updateCartQuantity };