const express = require("express");
const router = express.Router();
const { submitEnquiry, viewEnquiries, deleteEnquiries, changeStatus } = require("../../controller/admin/contactEnquiryController");

router.post("/submit", submitEnquiry);       // from website contact form
router.get("/view", viewEnquiries);          // admin panel
router.post("/delete", deleteEnquiries);     // admin panel
router.post("/change-status", changeStatus); // admin panel

module.exports = { contactEnquiryRoute: router };
