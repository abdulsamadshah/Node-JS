
const router = require("express").Router();
const { AddProduct, getProduct, getProductDetail } = require("../controller/Productcontroller");
const upload = require("../utils/uploadMiddleware");



router.route("/Seller/AddProduct").post(upload.single("ProductImage"), AddProduct);
router.route("/GetProduct").get(getProduct);
router.route("/GetProductDetails").get(getProductDetail);

module.exports = router;