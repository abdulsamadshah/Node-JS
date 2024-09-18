const coursescategory = require("../../models/coursescategory");
const AppError = require("../../utils/appError");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { validatecourseCateogy } = require("../../validators/CourseValidators");

const AddCourseCategory = asyncErrorHandler(async (req, res, next) => {
  const { CourseName, CourseImage } = req.body;
  const { error } = validatecourseCateogy(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  CourseImage = req.file ? req.file.filename : null;




  const category = await coursescategory.create({ CourseName, CourseImage });
  res.json({
    status: true,
    message: "Course Category Created Succes",
    data: category
  })
});



const getCourse_Category = asyncErrorHandler(async (req, res, next) => {

  const result = await coursescategory.findAll();
  res.json({
    status: true,
    message: result.length != 0 ? "Data Fetched Success" : "No Data found",
    CourseCategory: result,
  })

});





module.exports={AddCourseCategory,getCourse_Category};