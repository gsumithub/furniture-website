const express = require("express");
const router = express.Router();
const { subscribe, viewSubscribers, deleteSubscribers } = require("../../controller/admin/newsletterController");

const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

router.post("/subscribe", subscribe);        // from website
router.get("/view", adminAuthMiddleware, viewSubscribers);        // admin panel
router.post("/delete", adminAuthMiddleware, deleteSubscribers);   // admin panel

module.exports = { newsletterRoute: router };
