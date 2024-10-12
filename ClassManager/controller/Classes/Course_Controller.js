
const courseitem = require("../../models/courseitem");
const courses = require("../../models/courses");
const coursescategory = require("../../models/coursescategory");
const AppError = require("../../utils/appError");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { validatecourseCateogy, validatecourse_Product, validateCourse_Id, validateCourseDetail, validateId } = require("../../validators/CourseValidators");

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

  const newresult = product.map(product => {
    product.Image = `uploads/CourseProduct/${product.Image}`;
    return product;
  })




  res.json({
    status: true,
    message: product.length ? "Data fetched Success" : "No Data found",
    Product: newresult,
  })

});

const AddCoures = asyncErrorHandler(async (req, res, next) => {
  const { category, name, validity, price, discount, title, description } = req.body;
  const { error } = validateCourseDetail(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const image = req.file ? req.file.filename : null;
  let nameArray;
  try {
    nameArray = JSON.parse(req.body.name);
  } catch (e) {
    return next(new AppError('Invalid JSON format for name field', 400));
  }
  const result = await courses.create({ category, name: nameArray, validity, image, price, discount, title, description, createdBy: req.user.ClassId, });

  res.json({
    status: true,
    message: "Course created Succes",

  });

});



function getCourses(type) {
  return asyncErrorHandler(async (req, res, next) => {
    const result = await courses.findAll({
      where: { createdBy: req.user.ClassId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'createdBy']
      }
    });

    const newResult = result.map(course => {
      const courseNamelist = JSON.parse(course.name);
      const formattedName = courseNamelist.map(name => ({
        name: name
      }));

      const { name, ...otherProperties } = course.toJSON();

      return {
        ...otherProperties,
        courseNames: formattedName,
      };
    }).filter(course => {

      if (type === "Active") {
        return course.status === true;
      } else if (type === "Pending") {
        return course.status === false;
      }
      return false;
    });

    res.json({
      status: true,
      message: newResult.length ? "Data fetched success" : "No Data found",
      Courses: newResult,
    });
  });
}



const getCoursesDetail = asyncErrorHandler(async (req, res, next) => {
  const { error } = validateId(req.query);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await courses.findOne({
    where: { id: req.query.id, createdBy: req.user.ClassId },
  });

  if (!result) {
    return next(new AppError("please provide valid Id", 400))
  }
  const course_detail = result.toJSON();
  course_detail.name = JSON.parse(course_detail.name);
  course_detail.courseNames = course_detail.name.map(items => {
    return { name: items }
  })
  delete course_detail.createdAt;
  delete course_detail.updatedAt;
  delete course_detail.deletedAt;
  delete course_detail.createdBy;
  delete course_detail.name;



  res.json({
    status: true,
    message: "Success",
    Courses: course_detail,
  });
})



module.exports = { AddCourseCategory, getCourse_Category, AddCourse_Product, getCourse_Proudct, AddCoures, getCourses, getCoursesDetail };