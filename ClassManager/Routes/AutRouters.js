const { PersonalDetails, ClassesDetails,login } = require("../controller/AuthController");
const router = require("express").Router();
const upload = require("../utils/uploadMiddleware");
const authentication = require("../utils/authenticationMiddleware");

// Personal Details Registration Route
router.route("/auth/PersonalDetails")
  .post(upload("uploads/Auth/").single('ProfileImage'), PersonalDetails);

// Classes Details Registration Route
router.route("/auth/ClassesDetails")
  .post(upload("uploads/Auth/").fields([
    { name: "PanImage", maxCount: 1 },
    { name: "GstImage", maxCount: 1 },
    { name: "ClassesImages", maxCount: 1 }
  ]), authentication, ClassesDetails);

  router.route("/auth/login").post(login);
module.exports = router;
