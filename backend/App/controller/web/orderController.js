const Order = require("../../model/orderModel");
const Cart = require("../../model/cartModel");

// Create order (user)
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: userId,
      items: cart.items,
      shippingAddress: req.body.shippingAddress,
      totalAmount: req.body.totalAmount || 0,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: userId });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: View all orders
const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.send({ _status: true, _message: "All Orders", data: orders });
  } catch (err) {
    res.status(500).send({ _status: false, message: err.message });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Order.updateOne({ _id: id }, { $set: { status } });
    res.send({ _status: true, _message: "Order status updated" });
  } catch (err) {
    res.status(500).send({ _status: false, message: err.message });
  }
};

module.exports = { createOrder, viewAllOrders, updateOrderStatus };