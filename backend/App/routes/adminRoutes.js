let express = require("express")

const { colorRoute } = require("./admin/colorRoutes")
const { materialRoute } = require("./admin/materialRoutes")
const { countryRoute } = require("./admin/countryRoutes")
const { categoryRoute } = require("./admin/categoryRoutes")
const { faqRoute } = require("./admin/faqRoutes")
const { sliderRoute } = require("./admin/sliderRoutes")
const { subCategoryRoute } = require("./admin/subCategoryRoutes")
const { subSubCategoryRoute } = require("./admin/subSubCategoryRoutes")
const { whyChoseUsRoute } = require("./admin/whyChoseUsRoutes")
const { productRoute } = require("./admin/productRoutes")
const { testimonialRoute } = require("./admin/testimonialRoutes")
const { contactEnquiryRoute } = require("./admin/contactEnquiryRoutes")
const { newsletterRoute } = require("./admin/newsletterRoutes")
const { termsRoute } = require("./admin/termsRoutes")
const { adminUserRoute } = require("./admin/userRoutes")

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const { adminLogin } = require("../controller/admin/adminAuthController");

let adminRoute = express.Router()

// Public login route
adminRoute.post("/login", adminLogin);

// Protected routes (require adminAuthMiddleware)
adminRoute.use("/color", adminAuthMiddleware, colorRoute)
adminRoute.use("/material", adminAuthMiddleware, materialRoute)
adminRoute.use("/country", adminAuthMiddleware, countryRoute)
adminRoute.use("/category", adminAuthMiddleware, categoryRoute)
adminRoute.use("/subCategory", adminAuthMiddleware, subCategoryRoute)
adminRoute.use("/subSubCategory", adminAuthMiddleware, subSubCategoryRoute)
adminRoute.use("/faq", adminAuthMiddleware, faqRoute)
adminRoute.use("/slider", adminAuthMiddleware, sliderRoute)
adminRoute.use("/whyChoseUs", adminAuthMiddleware, whyChoseUsRoute)
adminRoute.use("/testimonial", adminAuthMiddleware, testimonialRoute)
adminRoute.use("/product", adminAuthMiddleware, productRoute)
adminRoute.use("/terms", adminAuthMiddleware, termsRoute)
adminRoute.use("/user", adminAuthMiddleware, adminUserRoute)

// Mixed routes (endpoints inside handle their own auth)
adminRoute.use("/contactEnquiry", contactEnquiryRoute)
adminRoute.use("/newsletter", newsletterRoute)

module.exports = { adminRoute }