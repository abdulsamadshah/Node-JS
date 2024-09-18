const express = require("express");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const path = require('path'); // Import the path module

app.use(express.urlencoded({ extended: true }));
const AutRouters = require("./Routes/AutRouters");
const CourseRouters = require("./Routes/CourseRouters");

app.use("/uploads", express.static(path.join(__dirname, 'uploads', 'Auth')));

// app.use("/api/v1/", CategoryRouters, ProductRouters, CartRouter, OrderRouter);

app.use("/api/v1/",AutRouters,CourseRouters);

app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is Running................" + PORT);
});