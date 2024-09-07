const { AddToCart, CartData, deleteCartItem, UpdateCartItem } = require("../controller/Cartcontroller");
const authentication = require("../utils/authenticationMiddleware");

const router = require("express").Router();

router.route("/AddToCart").post(authentication, AddToCart);
router.route("/GetCartData").get(authentication, CartData);
router.route("/DeleteCartItem").delete(authentication, deleteCartItem);
router.route("/UpdateCartItem").post(authentication, UpdateCartItem);


module.exports = router;