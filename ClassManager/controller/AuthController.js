const User = require("../models/user");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Handle Personal Details Registration
const PersonalDetails = asyncErrorHandler(async (req, res, next) => {
  let { FirstName, LastName, Email, MobileNo, Password, UserType } = req.body;
  let ProfileImage = req.file ? req.file.filename : null;

  // Validate UserType
  if (!["Classes", "Users"].includes(UserType)) {
    return next(new AppError("Invalid UserType", 400));
  }

  // Hash the Password
  const hashedPassword = await bcrypt.hash(Password, 12);

  // Prepare User Data
  const UserData = {
    FirstName,
    LastName,
    Email,
    MobileNo,
    Password: hashedPassword,
    ProfileImage,
    UserType,
  };

  // Save User to the Database
  const result = await User.create(UserData);
  const newResult = result.toJSON();

  // Generate Authentication Token
  const token = generateToken({ id: newResult.id });

  res.json({
    status: true,
    message: "Step One Registration successfully",
    data: {
      token: token,
      stepOne: true,
      stepTwo: false,
    },
  });
});

// Handle Classes Details Registration
const ClassesDetails = asyncErrorHandler(async (req, res, next) => {

  const userid = req.user.id;

  const user = await User.findByPk(userid);

  
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  let {ClassesName, PanNo, GstNumber, WhatsAppNumber, Address, Address2, CityName, StateName, PinCode } = req.body;
  const PanImage = req.files["PanImage"] ? req.files["PanImage"][0].path : null;
  const GstImage = req.files["GstImage"] ? req.files["GstImage"][0].path : null;
  const ClassesImages = req.files["ClassesImages"] ? req.files["ClassesImages"][0].path : null;


  // Prepare Class Data
  const ClassData = {
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
  };

   await User.update(ClassData, {
    where: {
      id: userid
    }
  });

  res.json({
    status: true,
    message: "Registration successfully",
  
  });
});

module.exports = { PersonalDetails, ClassesDetails };
