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

//---------------- Handle Personal Details Registration -------------------- //
const PersonalDetails = asyncErrorHandler(async (req, res, next) => {
  const { error } = validatePersonalDetails(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { FirstName, LastName, Email, MobileNo, Password } = req.body;
  const ProfileImage = req.file ? req.file.filename : null;

  const existingUser = await classes.findOne({ where: { Email } });

  if (existingUser) {
    // Prepare the updated fields
    const updatedFields = {
      FirstName: FirstName || existingUser.FirstName,
      LastName: LastName || existingUser.LastName,
      MobileNo: MobileNo || existingUser.MobileNo,
      Password: Password ,
    };

    // Update ProfileImage only if a new one is provided
    if (ProfileImage !== null) {
      updatedFields.ProfileImage = ProfileImage || existingUser.ProfileImage; 
    }

    await existingUser.update(updatedFields);

    return res.json({
      status: true,
      message: "User details updated successfully",
      data: {
        stepOne: true,
        stepTwo: true, // Indicate that step two is complete
      },
    });
  } else {
    //--------------------------- Create User ----------------------- //
  
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
  }
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

  // Extract image paths
  const PanImage = req.files?.PanImage?.[0]?.path || user.PanImage; // Default to existing if not provided
  const GstImage = req.files?.GstImage?.[0]?.path || user.GstImage; // Default to existing if not provided
  const ClassesImages = req.files?.ClassesImages?.[0]?.path || user.ClassesImages; // Default to existing if not provided

  // Prepare the updated fields dynamically
  const updatedFields = {
    ClassesName: ClassesName || user.ClassesName,
    PanNo: PanNo || user.PanNo,
    PanImage: PanImage, // Always set, even if unchanged
    GstNumber: GstNumber || user.GstNumber,
    GstImage: GstImage, // Always set, even if unchanged
    ClassesImages: ClassesImages, // Always set, even if unchanged
    WhatsAppNumber: WhatsAppNumber || user.WhatsAppNumber,
    Address: Address || user.Address,
    Address2: Address2 || user.Address2,
    CityName: CityName || user.CityName,
    StateName: StateName || user.StateName,
    PinCode: PinCode || user.PinCode,
  };

  // Update User class details
  await classes.update(updatedFields, { where: { ClassId: userId } });

  res.json({
    status: true,
    message: user.PanNo == null ? "Classes registration successfully completed" : "Updated successfully",
  });
});

//---------------------------- Login Api ----------------------------- //
const Classeslogin = asyncErrorHandler(async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { Email, Password } = req.body;
  const user = await classes.findOne({ where: { Email } });

  if (!user || !(await bcrypt.compare(Password, user.Password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Use ClassId instead of user.id
  const token = generateToken({ id: user.ClassId });

  res.json({
    status: true,
    message: "Login successfully",
    data: {
      token,
      stepOne: user.Email != null,  // StepOne is complete if email exists
      stepTwo: user.ClassesName != null,  // StepTwo is complete if ClassesName exists
    },
  });
});



const getClassesProfile = asyncErrorHandler(async (req, res, next) => {
  const id = req.user.ClassId;  // Get ClassId from req.user, set by authentication middleware

  console.log("Class ID from request user: ", id); // Log for debugging

  const result = await classes.findOne({ where: { ClassId: id } }); // Fetch user from database
  if (!result) {
    return next(new AppError("No User Found", 404));
  }

  const newResult = result.toJSON(); // Convert to JSON
  delete newResult.createdAt;
  delete newResult.updatedAt;
  delete newResult.deletedAt;
  // delete newResult.Password;

  newResult.ProfileImage = `uploads/Auth/${newResult.ProfileImage}`; // Add image path
  newResult.ClassesImages = `${newResult.ClassesImages}`; // Assuming this field exists

  res.json({
    status: true,
    message: "Profile fetched successfully",
    ProfileData: newResult,
  });
});






const logOut = asyncErrorHandler(async (req, res, next) => {

  return res.json({
    status: true,
    message: 'LogOut successfully',
  });

});





module.exports = { PersonalDetails, ClassesDetails, Classeslogin, getClassesProfile, logOut };
