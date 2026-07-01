const express = require("express");
const router = express.Router();
const { submitEnquiry, viewEnquiries, deleteEnquiries, changeStatus } = require("../../controller/admin/contactEnquiryController");

const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

router.post("/submit", submitEnquiry);       // from website contact form
router.get("/view", adminAuthMiddleware, viewEnquiries);          // admin panel
router.post("/delete", adminAuthMiddleware, deleteEnquiries);     // admin panel
router.post("/change-status", adminAuthMiddleware, changeStatus); // admin panel

module.exports = { contactEnquiryRoute: router };
