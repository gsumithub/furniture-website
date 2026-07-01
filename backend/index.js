const mongoose = require("mongoose");
let express = require("express");
require("dotenv").config();
let cors = require("cors");

const { adminRoute } = require("./App/routes/adminRoutes");
const webRoute = require("./App/routes/webRoutes"); //  IMPORTANT

let App = express();

App.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
App.use(express.json());

// Health check
App.get("/", (req, res) => res.send({ status: "ok", message: "Furniture API is running 🚀" }));

// ------------------------------ Admin Routes ------------------------------
App.use("/admin-api", adminRoute);

// ------------------------------ Static Folders ------------------------------
App.use("/uploads/category", express.static("uploads/category"));
App.use("/uploads/slider", express.static("uploads/slider"));
App.use("/uploads/subCategory", express.static("uploads/subCategory"));
App.use("/uploads/subSubCategory", express.static("uploads/subSubCategory"));
App.use("/uploads/product", express.static("uploads/product"));
App.use("/uploads/whyChoseUs", express.static("uploads/whyChoseUs"));
App.use("/uploads/testimonial", express.static("uploads/testimonial"));

// ------------------------------ Web Routes ------------------------------
App.use("/api", webRoute); //  THIS FIXES YOUR 404

// ------------------------------ DB CONNECTION ------------------------------
mongoose
  .connect(process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
  .then(() => {
    console.log("✅ MongoDB Connected");

    App.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });