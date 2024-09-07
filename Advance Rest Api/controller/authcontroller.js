const user = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


//------------------Generate Token ------------------- //

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

//------------------ Sign Up ------------------------ //
const signup = catchAsync(async (req, res, next) => {
    const body = req.body;
    if (!['1', '2'].includes(body.userType)) {
        throw new AppError("Invalid User Type", 400)

    } else {
        try {
            const newUser = await user.create({
                userType: body.userType,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,    
                confirmPassword: body.confirmPassword,
            });


            if (!newUser) {
                return next(new AppError("Failed to create the user", 400));
            }

            //--------------- Remove Extra data from response ----------- //

            const result = newUser.toJSON();
            delete result.password;
            delete result.deletedAt;

            result.token = generateToken({
                id: result.id,
            })


            return res.status(201).json({
                status: 'success',
                data: result
            });



        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }


});




//---------------------------- Login Api ----------------------------- //
const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email or password", 400))
        // return res.status(400).json({
        //     status: "fail",
        //     message: "Please provide email or password"
        // });
    }

    //------fetching the data from user model ------------- //
    const result = await user.findOne({ where: { email } });

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
        // return res.status(401).json({
        //     status: "fail",
        //     message: "Incorrect email or password"
        // })
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: "success",
        token,
    })
});


//----------------- Token Authentication ------------------ //
const authentication = catchAsync(async (req, res, next) => {
    //1. get the token from the header 
    let idToken = "";
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //Example Bearer dsajlfasdklfjsdlakfjsdaklf
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError("Please login to get Access", 401))
    }

    // 2. token Verification
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);

    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError("user no longer exists", 400));

    }

    req.user = freshUser;
    //authentication success next middleware will be connect //
    return next();


});


//************************ GetProfileDetails ************************* */
const getUserProfile = catchAsync(async (req, res, next) => {

    const userid = req.user.id;
    console.log(userid)

    const result = await user.findOne({ where: { id: userid } });

    if (!result) {
        return next(new AppError("No User Found"));
    }

    //++++++++++++ Custom data passsed in Response ///////////////
    const Newresult = result.toJSON();
    delete Newresult.password;
    delete Newresult.deletedAt;

    return res.json({
        status: true,
        data: Newresult,
    })


});








//-------------------- getAllUsers ++++++++++++++++++++++++++++ //
const getAllUsers =catchAsync(async (req,res,next)=>{
    
    const result= await user.findAll();
    if(result.length==0){
        return next(new AppError("Not Data Found",200));
    }

    

    return res.json({
        status:true,
        data:result,
    });
})


//--------------- Restrict Access The Api for ther people like seller,buyer,admin --------------- //
const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        console.log("Usertype:" + userType);
        console.log('UserTypesbody:' + req.user.userType);
        if (!userType.includes(req.user.userType)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action",
                    403
                )
            );
        }
        return next();
    };

    return checkPermission;
};

module.exports = { signup, login, authentication, restrictTo, getUserProfile,getAllUsers };
