const { AddCourseCategory, getCourse_Category } = require("../controller/Classes/Course_Controller");
const upload = require("../utils/uploadMiddleware");

const router = require("express").Router();

router.route("/Admin/AddCourseCategory").post(upload("uploads/Course/").single("CourseImage"), AddCourseCategory);
router.route("/GetCourseCategory").get(getCourse_Category);


module.exports = router;