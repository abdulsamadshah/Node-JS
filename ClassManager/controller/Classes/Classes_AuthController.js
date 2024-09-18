const classes = require("../../models/Classes");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const AppError = require("../../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validatePersonalDetails, validateLogin } = require("../../validators/userValidators");


// Utility to generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Handle Personal Details Registration
const PersonalDetails = asyncErrorHandler(async (req, res, next) => {
  const { error } = validatePersonalDetails(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { FirstName, LastName, Email, MobileNo, Password } = req.body;
  const ProfileImage = req.file ? req.file.filename : null;


  const result = await classes.create({
    FirstName,
    LastName,
    Email,
    MobileNo,
    Password,
    ProfileImage,
  });

  const newResult = await result.toJSON();
  const token = generateToken({ id: newResult.ClassId });


  res.json({
    status: true,
    message: "Step One Registration successful",
    data: {
      token, stepOne: true, stepTwo: false,
    },
  });
});


const ClassesDetails = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.ClassId;
  const user = await classes.findByPk(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const {
    ClassesName,
    PanNo,
    GstNumber,
    WhatsAppNumber,
    Address,
    Address2,
    CityName,
    StateName,
    PinCode,
  } = req.body;

  const PanImage = req.files?.PanImage?.[0]?.path || null;
  const GstImage = req.files?.GstImage?.[0]?.path || null;
  const ClassesImages = req.files?.ClassesImages?.[0]?.path || null;

  // Update User class details
  await classes.update(
    {
      ClassesName,
      PanNo,
      PanImage,
      GstNumber,
      GstImage,
      ClassesImages,
      WhatsAppNumber,
      Address,
      Address2,
      CityName,
      StateName,
      PinCode,
    },
    { where: { ClassId: userId } }
  );

  res.json({
    status: true,
    message: "Classes registration successfully completed",
  });
});

//---------------------------- Login Api ----------------------------- //
const Classeslogin = asyncErrorHandler(async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { Email, Password } = req.body;
  console.log("-------------ClassesData")
  const user = await classes.findOne({ where: { Email } });

  if (!user || !(await bcrypt.compare(Password, user.Password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({ id: user.id });



  res.json({
    status: true,
    data: {
      token, stepOne: `${user.Email != null ? true : false}`, stepTwo: `${user.ClassesName != null ? true : false}`,
    },
  });
});


const getClassesProfile = asyncErrorHandler(async (req, res, next) => {
  const id = req.user.ClassId;


  const result = await classes.findOne({ where: { ClassId: id } });
  if (!result) {
    return next(new AppError("No User Found", 404));
  }

  const newResult = await result.toJSON();
  delete newResult.createdAt;
  delete newResult.updatedAt;
  delete newResult.deletedAt;
  delete newResult.Password;



  res.json({
    status: true,
    message: "Profile fetched Succes",
    ProfileData: newResult,
  });

})

module.exports = { PersonalDetails, ClassesDetails, Classeslogin, getClassesProfile };
