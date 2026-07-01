const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../model/userModel");
const { transporter } = require("../../config/helper");

const saltRounds = 10;

// ================= REGISTER =================
let CreateUser = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.send({
        _status: false,
        _message: "User already exists",
      });
    }

    const hash = bcrypt.hashSync(password, saltRounds);

    let user = await userModel.create({
      name,
      email,
      phone,
      password: hash,
    });

    res.send({
      _status: true,
      _message: "User Added",
      user,
    });

  } catch (err) {
    res.send({
      _status: false,
      _message: err.message,
    });
  }
};

// ================= LOGIN =================
let Userlogin = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return res.send({
      _status: false,
      _message: "Email not found",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.send({
      _status: false,
      _message: "Invalid password",
    });
  }

  let token = jwt.sign(
    { userId: user._id },
    process.env.TOKENKEY || "12345"
  );

  res.send({
    _status: true,
    _message: "Login Success",
    token,
  });
};

// ================= CHANGE PASSWORD =================
let changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword, confirmPassword } = req.body;

    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.send({
        _status: false,
        _message: "No token",
      });
    }

    let decode = jwt.verify(token, process.env.TOKENKEY || "12345");

    let user = await userModel.findById(decode.userId);

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return res.send({
        _status: false,
        _message: "Invalid old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.send({
        _status: false,
        _message: "Passwords do not match",
      });
    }

    const hash = bcrypt.hashSync(newPassword, saltRounds);

    await userModel.updateOne(
      { _id: user._id },
      { $set: { password: hash } }
    );

    res.send({
      _status: true,
      _message: "Password changed successfully",
    });

  } catch (err) {
    res.send({
      _status: false,
      _message: err.message,
    });
  }
};

// ================= FORGOT PASSWORD =================
let forgotPassword = async (req, res) => {
  let { email } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return res.send({
      _status: false,
      _message: "Email not found",
    });
  }

  await transporter.sendMail({
    from: '"Ecom App" <test@gmail.com>',
    to: email,
    subject: "Reset Password",
    html: `<a href="http://localhost:3000/reset-password/${user._id}">Reset Password</a>`,
  });

  res.send({
    _status: true,
    _message: "Reset link sent",
  });
};

// ================= RESET PASSWORD =================
let resetPassword = async (req, res) => {
  let { userId } = req.params;
  let { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.send({
      _status: false,
      _message: "Passwords do not match",
    });
  }

  const hash = bcrypt.hashSync(newPassword, saltRounds);

  await userModel.updateOne(
    { _id: userId },
    { $set: { password: hash } }
  );

  res.send({
    _status: true,
    _message: "Password reset successful",
  });
};

// ================= GET USER DATA =================
let getUserData = async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];

  let decode = jwt.verify(token, process.env.TOKENKEY || "12345");

  let user = await userModel.findById(decode.userId);

  res.send({
    _status: true,
    user,
  });
};

module.exports = {
  CreateUser,
  Userlogin,
  changePassword,
  forgotPassword,
  resetPassword,
  getUserData,
};