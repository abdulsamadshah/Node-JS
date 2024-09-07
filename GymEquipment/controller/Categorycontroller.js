const category = require("../models/category");
const AppError = require("../utils/appError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const CreateCategory = asyncErrorHandler(async (req, res, next) => {
    const body = req.body;

    // If an image file is uploaded, add its filename to the body
    if (req.file) {
        body.CategoryImage = req.file.filename;
    }
    await category.create({
        CategoryName: body.CategoryName,
        CategoryImage: body.CategoryImage,

    });

    res.json({
        status: true,
        message: "Category Created Successfully",
        // data:result
    })
});

const getCategory = asyncErrorHandler(async (req, res, next) => {

    const result = await category.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
    });


    res.json({
        status: true,
        message: `${result.length == 0 ? "Data not Found" : "Data fetched Successfully"}`,
        data: result,
    });
})

module.exports = { CreateCategory, getCategory }