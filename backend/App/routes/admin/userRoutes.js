const express = require("express");
const router = express.Router();

const { viewUsers, toggleAdmin, deleteUser } = require("../../controller/admin/userController");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

router.get("/view", adminAuthMiddleware, viewUsers);
router.post("/toggle-admin", adminAuthMiddleware, toggleAdmin);
router.post("/delete", adminAuthMiddleware, deleteUser);

module.exports = { adminUserRoute: router };
