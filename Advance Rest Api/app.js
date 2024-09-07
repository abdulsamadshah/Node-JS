const express = require('express');
const router = require('./Routes/authRouters');
const projectRouter = require('./Routes/projectRouters');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
require('dotenv').config({ path: `${process.cwd()}/.env` })
const app = express();
app.use(express.json());



// Every Router initialize will be here
app.use('/api/v1/auth', router);
app.use('/api/v1/projects', projectRouter);



// this method will check route valid or not valid 

//Server crash and Secure Api handel from the hacker
app.use('*', catchAsync(async (req, res, next) => {
    throw new AppError(`can't find ${req.originalUrl} on this`, 404);
}));

app.use(globalErrorHandler);


const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running", PORT);
});