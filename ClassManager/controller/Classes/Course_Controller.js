
const courseitem = require("../../models/courseitem");
const courses = require("../../models/courses");
const coursescategory = require("../../models/coursescategory");
const AppError = require("../../utils/appError");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { validatecourseCateogy, validatecourse_Product, validateCourse_Id, validateCourseDetail } = require("../../validators/CourseValidators");

const AddCourseCategory = asyncErrorHandler(async (req, res, next) => {
  const { CourseName } = req.body;
  const { error } = validatecourseCateogy(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const CourseImage = req.file ? req.file.filename : null;




  await coursescategory.create({ CourseName, CourseImage });
  res.json({
    status: true,
    message: "Course Category Created Succes",
  })
});


const getCourse_Category = asyncErrorHandler(async (req, res, next) => {
  const result = await coursescategory.findAll({
    attributes: {
      exclude: [
        'createdAt', 'updatedAt', 'deletedAt'
      ]
    }
  });
  res.json({
    status: true,
    message: result.length ? "Data Fetched Success" : "No Data found",
    CourseCategory: result,
  })

});



const AddCourse_Product = asyncErrorHandler(async (req, res, next) => {
  const { name, CourseId } = req.body;
  const { error } = validatecourse_Product(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));
  const Image = req.file ? req.file.filename : null;
  const CategoryidExists = await coursescategory.findByPk(CourseId);
  if (!CategoryidExists) {
    return res.status(400).json({
      status: false,
      message: "Invalid CategoryId",
    });
  }

  await courseitem.create({ CourseId, name, Image });

  res.json({
    status: true,
    message: "Product Created Succes",
  })
});

const getCourse_Proudct = asyncErrorHandler(async (req, res, next) => {
  const CourseId = req.query.CourseId;
  const { error } = validateCourse_Id(req.query);
  if (error) return next(new AppError(error.details[0].message, 400));
  const product = await courseitem.findAll({
    where: { CourseId }, attributes: {
      exclude: [
        'createdAt', 'updatedAt', 'deletedAt', 'CourseId'
      ]
    }
  },);

  res.json({
    status: true,
    message: product.length ? "Data fetched Success" : "No Data found",
    Product: product,
  })

});

const AddCoures = asyncErrorHandler(async (req, res, next) => {
  const { category, name, validity, price, discount, title, description } = req.body;
  const { error } = validateCourseDetail(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const image = req.file ? req.file.filename : null;

  const result = await courses.create({ category, name, validity, image, price, discount, title, description, createdBy: req.user.ClassId, });

  res.json({
    status: true,
    message: "Course created Succes",
    result: result,
  });

});



const getCourses = asyncErrorHandler(async (req, res, next) => {
  const result = await courses.findAll({
    where: { createdBy: req.user.ClassId }, attributes: {
      exclude: [
        'createdAt', 'updatedAt', 'deletedAt', 'createdBy'
      ]
    }
  });

  res.json({
    status: true,
    message: result.length ? "Data fetched success" : "No Data found",
    Courses: result,
  })
})



module.exports = { AddCourseCategory, getCourse_Category, AddCourse_Product, getCourse_Proudct, AddCoures, getCourses };