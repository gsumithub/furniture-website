let express = require("express");

const {
  getSlider,
  getProduct,
  getProductDetail,
  getTestimonial,
  getBestSelling,
  getNewArrivals,
  getOnSale,
  getCategories,
  getWhyChooseUs,
  getFaqs,
  getTopRated,
  getTerms
} = require("../../controller/web/homeController");

let homeRoute = express.Router();

homeRoute.get('/slider', getSlider);
homeRoute.get('/products', getProduct);
homeRoute.get('/product-details/:slug', getProductDetail);
homeRoute.get('/testimonials', getTestimonial);
homeRoute.get('/best-selling', getBestSelling);
homeRoute.get('/new-arrivals', getNewArrivals);
homeRoute.get('/on-sale', getOnSale);
homeRoute.get('/categories', getCategories);
homeRoute.get('/why-choose-us', getWhyChooseUs);
homeRoute.get('/faqs', getFaqs);
homeRoute.get('/top-rated', getTopRated);
homeRoute.get('/terms', getTerms);

module.exports = homeRoute;