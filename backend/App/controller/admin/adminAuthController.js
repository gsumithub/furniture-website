const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const expectedAdminEmail = process.env.ADMIN_EMAIL || "krsumit2203@gmail.com";
    const expectedAdminPassword = process.env.ADMIN_PASSWORD || "$upremeMONISTA2203";

    if (email === expectedAdminEmail && password === expectedAdminPassword) {
      const token = jwt.sign(
        { email: expectedAdminEmail, isAdmin: true },
        process.env.TOKENKEY || "12345",
        { expiresIn: "7d" }
      );

      return res.json({
        _status: true,
        _message: "Admin login successful",
        token,
      });
    }

    // Check database admin users
    const dbUser = await User.findOne({ email });
    if (dbUser && dbUser.isAdmin) {
      if (bcrypt.compareSync(password, dbUser.password)) {
        const token = jwt.sign(
          { email: dbUser.email, userId: dbUser._id, isAdmin: true },
          process.env.TOKENKEY || "12345",
          { expiresIn: "7d" }
        );

        return res.json({
          _status: true,
          _message: "Admin login successful",
          token,
        });
      }
    }

    return res.json({
      _status: false,
      _message: "Invalid email or password",
    });
  } catch (err) {
    res.status(500).json({ _status: false, _message: err.message });
  }
};

module.exports = { adminLogin };
