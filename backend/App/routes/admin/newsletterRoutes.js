const express = require("express");
const router = express.Router();
const { subscribe, viewSubscribers, deleteSubscribers } = require("../../controller/admin/newsletterController");

router.post("/subscribe", subscribe);        // from website
router.get("/view", viewSubscribers);        // admin panel
router.post("/delete", deleteSubscribers);   // admin panel

module.exports = { newsletterRoute: router };
