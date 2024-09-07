const { CreateCategory, getCategory } = require("../controller/Categorycontroller");

const router = require("express").Router();
const upload = require("../utils/uploadMiddleware");


router.route("/Seller/AddCategory").post(upload.single("CategoryImage"),CreateCategory);
router.route("/GetCategory").get(getCategory);

module.exports = router;