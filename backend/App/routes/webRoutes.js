const express = require("express");

const authRoute = require("./web/authRoutes");
const homeRoute = require("./web/homeRoutes");
const cartRoute = require("./web/cartRoutes");  // cart
const orderRoute = require("./web/orderRoutes"); // order
const wishlistRoute = require("./web/wishlistRoutes"); // wishlist

let webRoute = express.Router();

webRoute.use("/user", authRoute);
webRoute.use("/home", homeRoute);
webRoute.use("/cart", cartRoute);// cart
webRoute.use("/order", orderRoute); //  order
webRoute.use("/wishlist", wishlistRoute); // wishlist

module.exports = webRoute;