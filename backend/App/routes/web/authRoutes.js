const express = require("express");
const router = express.Router();

const {
  CreateUser,
  Userlogin,
  changePassword,
  forgotPassword,
  resetPassword,
  getUserData,
} = require("../../controller/web/authController");

// ROUTES

router.post("/create", CreateUser);
router.post("/login", Userlogin);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:userId", resetPassword);
router.get("/get-data", getUserData);

module.exports = router;