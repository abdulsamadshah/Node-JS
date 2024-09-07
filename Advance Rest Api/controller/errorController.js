const AppError = require("../utils/appError");

//-------------Developemtn and Product wise Response will be show -------- //
const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    const message = error.message;
    const stack = error.stack;


    res.status(statusCode).json({
        status,
        message,
        stack,//stack are seing where error path will be show
    });

    console.log(error.name, error.message, stack);
}

const sendErrorProd = (error, res) => {

    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    const message = error.message;
    const stack = error.stack;



    if (error.isOperational) {
        return res.status(statusCode).json({
            status,
            message,
        });
    }

    console.log(error.name, error.message, stack);
    return res.status(500).json({
        status: "error",
        message: "something went very wrong",

    });
}

const globalErrorHandler = (err, req, res, next) => {

    //--------- Validaton Handle ----------- //
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401);
    }
    
    if (err.name === 'SequelizeValidationError') {
        err = new AppError(err.errors[0].message, 400);
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400);
    }


    if (process.env.NODE_ENV === "development") {
        console.log("devlopment working...")
        return sendErrorDev(err,res);
        
    }

    sendErrorProd(err, res);
}

module.exports = globalErrorHandler;