const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError'); // Adjust the path as necessary
const catchAsync = require('./asyncErrorHandler'); // Adjust the path as necessary
const user  = require('../models/Classes'); // Import the user model from your database

const authentication = catchAsync(async (req, res, next) => {
    // 1. Get the token from the header
    let idToken = "";
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError("Please provide a token", 401));
    }
    console.log("------------------idToken--------------------",idToken.id)
    // 2. Token verification
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);


    console.log("------------------TokenId--------------------",tokenDetail.id)
    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError("User no longer exists", 400));
    }

    req.user = freshUser;
    // Authentication success, proceed to the next middleware
    next();
});

module.exports = authentication;
