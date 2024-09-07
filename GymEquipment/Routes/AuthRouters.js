const {Signup, login, getAllUsers, getUserProfile } = require("../controller/AuthController");
const authentication = require("../utils/authenticationMiddleware");

const router = require("express").Router();
const upload = require("../utils/uploadMiddleware");


router.route("/Signup").post(upload.single("ProfileImage"), Signup);
router.route("/login").post(login);
router.route("/getUserProfile").get(authentication,getUserProfile);
router.route("/getAllUsers").get(getAllUsers);


module.exports = router;