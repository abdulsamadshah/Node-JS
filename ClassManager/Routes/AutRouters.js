const { PersonalDetails, ClassesDetails, Classeslogin, getClassesProfile } = require("../controller/Classes/Classes_AuthController");
const router = require("express").Router();
const upload = require("../utils/uploadMiddleware");
const {authentication,Userauthentication} = require("../utils/authenticationMiddleware");
const { UserDetails, Userlogin, getUserProfileData } = require("../controller/Users/User_AuthController");




//--------------- Classes ------------------ //

router.route("/Classes/auth/PersonalDetails")
  .post(upload("uploads/Auth/").single('ProfileImage'), PersonalDetails);


router.route("/Classes/auth/ClassesDetails")
  .post(upload("uploads/Auth/").fields([
    { name: "PanImage", maxCount: 1 },
    { name: "GstImage", maxCount: 1 },
    { name: "ClassesImages", maxCount: 1 }
  ]), authentication, ClassesDetails);

router.route("/Classes/auth/login").post(Classeslogin);
router.route("/Classes/auth/getProfileData").get(authentication,getClassesProfile);


//--------------- Users ------------------ //
router.route("/User/auth/PersonalDetails")
  .post(upload("uploads/Auth/").single('ProfileImage'), UserDetails);

router.route("/User/auth/login").post(Userlogin);
router.route("/User/auth/UserProfile").get(Userauthentication,getUserProfileData,);



module.exports = router;
