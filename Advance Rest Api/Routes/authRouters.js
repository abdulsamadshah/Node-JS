
const {signup,login, getUserProfile,authentication,getAllUsers} =require('../controller/authcontroller');

const router = require('express').Router();


router.route('/signup').post(signup);

router.route("/login").post(login);
router.route("/getUserProfile").get(authentication,getUserProfile);
router.route("/getAllUsers").get(getAllUsers);



module.exports = router;