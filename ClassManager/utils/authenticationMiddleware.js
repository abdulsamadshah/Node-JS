const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('./asyncErrorHandler');
const classes = require('../models/Classes');
const users = require('../models/users');

const authentication = catchAsync(async (req, res, next) => {
    let idToken = "";
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError("Please provide a token", 401));
    }

    let tokenDetail;
    try {
        tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new AppError("Invalid or expired token", 401));
    }

    const freshUser = await classes.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError("User no longer exists", 400));
    }

    req.user = freshUser;
    next();
});



const Userauthentication = catchAsync(async (req, res, next) => {
    let idToken = "";
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError("Please provide a token", 401));
    }

    const tokenDetail = jwt.verify(idToken, process.env.JWT_User_SECRET_KEY);

    const freshUser = await users.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError("User no longer exists", 400));
    }

    req.user = freshUser;
    next();
});



module.exports = { authentication, Userauthentication };
