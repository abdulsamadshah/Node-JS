const users = require("../../models/users");
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
const UserDetails = asyncErrorHandler(async (req, res, next) => {
  const { error } = validatePersonalDetails(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { FirstName, LastName, Email, MobileNo, Password } = req.body;
  const ProfileImage = req.file ? req.file.filename : null;



  
  const result = await users.create({
    FirstName,
    LastName,
    Email,
    MobileNo,
    Password,
    ProfileImage,
  });

  const token = generateToken({ id: result.UserId });


  res.json({
    status: true,
    message: "Registration successful",
    data: {
      token,
    },
  });
});




//---------------------------- Login Api ----------------------------- //
const Userlogin = asyncErrorHandler(async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { Email, Password } = req.body;
  const user = await users.findOne({ where: { Email } });

  if (!user || !(await bcrypt.compare(Password, user.Password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({ id: user.id });



  res.json({
    status: true,
    token, 
  });
});

module.exports = { UserDetails, Userlogin };
