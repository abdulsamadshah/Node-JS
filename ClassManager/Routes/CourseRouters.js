const { AddCourseCategory, getCourse_Category, AddCourse_Product, getCourse_Proudct, AddCoures, getCourses, getCoursesDetail } = require("../controller/Classes/Course_Controller");
const { authentication } = require("../utils/authenticationMiddleware");
const upload = require("../utils/uploadMiddleware");

const router = require("express").Router();

router.route("/Admin/AddCourseCategory").post(upload("uploads/CourseCategory/").single("CourseImage"), AddCourseCategory);
router.route("/GetCourseCategory").get(getCourse_Category);

// router.route("/Admin/AddCourse_Product").post(upload("uploads/CourseProduct/").single("Image"),AddCourse_Product);

router.route("/Admin/AddCourse_Product").post(upload("uploads/CourseProduct/").single("Product_Image"), AddCourse_Product);

router.route("/GetCourse_Product").get(getCourse_Proudct)


router.route("/Classes/AddCourses").post(upload("uploads/Courses/").single("image"),authentication, AddCoures);
router.route("/Classes/Active_courses").get(authentication, getCourses("Active"));
router.route("/Classes/Pending_courses").get(authentication, getCourses("Pending"));

router.route("/Classes/GetCourse_detail").get(authentication,getCoursesDetail);



module.exports = router;