const User = require("../../model/userModel");

const viewUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted_at: null });
    res.json({ _status: true, data: users });
  } catch (err) {
    res.status(500).json({ _status: false, message: err.message });
  }
};

const toggleAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ _status: false, message: "User not found" });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ _status: true, message: `Admin privileges updated for ${user.name}`, user });
  } catch (err) {
    res.status(500).json({ _status: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndDelete(userId);
    }
    res.json({ _status: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ _status: false, message: err.message });
  }
};

module.exports = { viewUsers, toggleAdmin, deleteUser };
