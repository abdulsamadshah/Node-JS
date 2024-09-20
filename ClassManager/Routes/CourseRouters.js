const { AddCourseCategory, getCourse_Category, AddCourse_Product, getCourse_Proudct } = require("../controller/Classes/Course_Controller");
const upload = require("../utils/uploadMiddleware");

const router = require("express").Router();

router.route("/Admin/AddCourseCategory").post(upload("uploads/CourseCategory/").single("CourseImage"), AddCourseCategory);
router.route("/GetCourseCategory").get(getCourse_Category);

// router.route("/Admin/AddCourse_Product").post(upload("uploads/CourseProduct/").single("Image"),AddCourse_Product);

router.route("/Admin/AddCourse_Product").post(upload("uploads/CourseProduct/").single("Image"), AddCourse_Product);

router.route("/GetCourse_Product").get(getCourse_Proudct)


module.exports = router;