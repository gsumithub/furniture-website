const express = require("express");
const router = express.Router();
const { addOrUpdateTerms, viewTerms } = require("../../controller/admin/termsController");

router.post("/save", addOrUpdateTerms);  // admin panel
router.get("/view", viewTerms);          // admin + public

module.exports = { termsRoute: router };
