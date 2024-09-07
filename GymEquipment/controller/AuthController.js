const asyncErrorHandler = require("../utils/asyncErrorHandler");

const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

//------------------Generate Token ------------------- //

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}


const Signup = asyncErrorHandler(async (req, res, next) => {
    const body = req.body;

    if (req.file) {
        body.ProfileImage = req.file.filename;
    }

    const result = await user.create({
        userType: body.userType,
        ProfileImage: body.ProfileImage,
        Name: body.Name,
        MobileNo: body.MobileNo,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,

    });

    if (!result) {
        return next(new AppError("Failed to create the user", 400));
    }

    const newResult = await result.toJSON();
    delete newResult.createdAt;
    delete newResult.updatedAt;
    delete newResult.deletedAt;

    newResult.token = generateToken({
        id: newResult.id,
    })



    res.json({
        status: true,
        message: "Registeration Successfully",
        data: newResult
    })
});

//---------------------------- Login Api ----------------------------- //
const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email or password", 400))
    }

    //------fetching the data from user model ------------- //
    const result = await user.findOne({ where: { email } });

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: true,
        token,
    })
});





//************************ GetProfileDetails ************************* */
const getUserProfile = asyncErrorHandler(async (req, res, next) => {

    const userid = req.user.id;
    const result = await user.findOne({ where: { id: userid } });

    if (!result) {
        return next(new AppError("No User Found"));
    }

    //++++++++++++ Custom data passsed in Response ///////////////
    const Newresult = result.toJSON();
    delete Newresult.password;
    delete Newresult.deletedAt;
    delete Newresult.createdAt;
    delete Newresult.updatedAt;



    return res.json({
        status: true,
        data: Newresult,
    })


});










//-------------------- getAllUsers ++++++++++++++++++++++++++++ //
const getAllUsers = asyncErrorHandler(async (req, res, next) => {

    const result = await user.findAll();
    if (result.length == 0) {
        return next(new AppError("Not Data Found", 200));
    }



    return res.json({
        status: true,
        data: result,
    });
})
module.exports = { Signup, login, getUserProfile, getAllUsers }