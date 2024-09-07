const express = require("express");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads/categories", express.static(path.join(__dirname, 'uploads', 'categories')));
// app.use("/api/v1/", CategoryRouters, ProductRouters, CartRouter, OrderRouter);



app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is Running................" + PORT);
});