
const authentication = require("../utils/authenticationMiddleware");
const { CreateOrder, OrdersData, OrdersDetailsData, updateOrderStatus } = require("../controller/OrderController");

const router = require("express").Router();

router.route("/CreateOrder").post(authentication, CreateOrder);
router.route("/GetOrderData").get(authentication,OrdersData);
router.route("/GetOrderDetails").get(authentication,OrdersDetailsData);
router.route("/Seller/UpdateOrderStatus").post(authentication,updateOrderStatus);



module.exports = router;