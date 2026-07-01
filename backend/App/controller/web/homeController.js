const productModel = require("../../model/productModel");
const sliderModel = require("../../model/sliderModel");
const testimonialModel = require("../../model/testimonialModel");
const categoryModel = require("../../model/categoryModel");
const whyChoseUsModel = require("../../model/whyChoseUsModel");
const faqModel = require("../../model/faqModel");
const termsModel = require("../../model/termsModel");

//  COMMON PRODUCT API
let getProduct = async (req, res) => {
    try {
        let { type, q } = req.query;
        let filter = { deleted_at: null, status: true };
        if (type) filter.productType = type;
        if (q) {
            filter.name = { $regex: q.trim(), $options: "i" };
        }

        let data = await productModel
            .find(filter)
            .populate("parentCategory", "name")
            .populate("subCategory", "name")
            .populate("subSubCategory", "name")
            .populate("color", "name")
            .populate("material", "name");

        res.send({ _status: true, _message: "Product View", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getProductDetail = async (req, res) => {
    try {
        let { slug } = req.params;
        let data = await productModel
            .findOne({ deleted_at: null, slug, status: true })
            .populate("parentCategory", "name")
            .populate("subCategory", "name")
            .populate("subSubCategory", "name")
            .populate("color", "name")
            .populate("material", "name");

        res.send({ _status: true, message: "Product Detail View", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getSlider = async (req, res) => {
    try {
        let data = await sliderModel.find({ deleted_at: null, status: true });
        res.send({ _status: true, _message: 'Slider view', path: process.env.SLIDERPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getTestimonial = async (req, res) => {
    try {
        let data = await testimonialModel.find({ deleted_at: null, status: true });
        res.send({ _status: true, _message: 'Testimonial view', path: process.env.TESTIMONIALPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getBestSelling = async (req, res) => {
    try {
        let data = await productModel.find({ bestSelling: true, status: true, deleted_at: null });
        res.send({ _status: true, _message: "Best Selling Products", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getNewArrivals = async (req, res) => {
    try {
        let data = await productModel.find({ status: true, deleted_at: null }).sort({ created_at: -1 }).limit(10);
        res.send({ _status: true, _message: "New Arrivals", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getOnSale = async (req, res) => {
    try {
        let data = await productModel.find({ status: true, deleted_at: null, $expr: { $lt: ["$price", "$actualPrice"] } });
        res.send({ _status: true, _message: "On Sale Products", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

let getCategories = async (req, res) => {
    try {
        let data = await categoryModel.find({ deleted_at: null, status: true });
        res.send({ _status: true, _message: "Categories view", path: process.env.CATEGORYPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

// ================= WHY CHOOSE US =================
let getWhyChooseUs = async (req, res) => {
    try {
        let data = await whyChoseUsModel.find({ deleted_at: null, status: true }).sort({ order: 1 });
        res.send({ _status: true, _message: "Why Choose Us", path: process.env.WHYCHOSEUS, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

// ================= FAQS =================
let getFaqs = async (req, res) => {
    try {
        let data = await faqModel.find({ deleted_at: null, status: true }).sort({ order: 1 });
        res.send({ _status: true, _message: "FAQs", data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

// ================= TOP RATED =================
let getTopRated = async (req, res) => {
    try {
        let data = await productModel
            .find({ topRated: true, status: true, deleted_at: null })
            .populate("parentCategory", "name")
            .limit(3);
        res.send({ _status: true, _message: "Top Rated Products", path: process.env.PRODUCTPATH, data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

// ================= TERMS & CONDITIONS =================
let getTerms = async (req, res) => {
    try {
        const data = await termsModel.findOne();
        res.send({ _status: true, _message: "Terms & Conditions", data });
    } catch (err) {
        res.status(500).send({ _status: false, message: err.message });
    }
};

module.exports = {
    getProduct,
    getProductDetail,
    getSlider,
    getTestimonial,
    getBestSelling,
    getNewArrivals,
    getOnSale,
    getCategories,
    getWhyChooseUs,
    getFaqs,
    getTopRated,
    getTerms
};