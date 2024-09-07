const { status } = require("express/lib/response");
const project = require("../models/project");

const catchAsync = require("../utils/catchAsync");
const user = require("../models/user");
const AppError = require("../utils/appError");

const createProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userid = req.user.id;

    const newProject = await project.create({
        title: body.title,
        // isFeatured: body.isFeatured,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
        createdBy: userid
    });

    return res.status(201).json({
        status: "success",
        data: newProject
    });
});



const getAllProject = catchAsync(async (req, res, next) => {
    const userid = req.user.id;
    //{include:user} api will be user data because we are using has many
    const projectData = await project.findAll({ include: user, where: { createdBy: userid } });

    return res.json({
        status: "success",
        data: projectData,
    })
});

const getProjectById = catchAsync(async (req, res, next) => {

    const projectId = req.params.id;

    const result = await project.findByPk(projectId, { include: user });


    if (!result) {
        return next(new AppError("Invalid project Id", 400));
    }

    return res.json({
        status: "success",
        data: result,
    })
});



const updateProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userid = req.user.id;
    const projectId = req.params.id;

    // const result = await project.findByPk(projectId) //+++++++++++++++++++++++ update project withour user id ---------------
    const result = await project.findOne({ where: { id: projectId, createdBy: userid } });


    result.title = body.title;
    // isFeatured: body.isFeatured,
    result.productImage = body.productImage;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;
    // result.createdBy= userid

    if (!result) {
        return next(new AppError("Invalid project Id", 400))
    }

    const updatedResult = await result.save();

    return res.json({
        status: "success",
        data: updatedResult
    });
});



const deleteProject = catchAsync(async (req, res, next) => {
    const userid = req.user.id;
    const projectId = req.params.id;

    // const result = await project.findByPk(projectId) //+++++++++++++++++++++++ update project withour user id ---------------
    const result = await project.findOne({ where: { id: projectId, createdBy: userid } });

    if (!result) {
        return next(new AppError("Invalid project Id", 400))
    }


    await result.destroy();

    return res.json({
        status: result,
        message: "Record deleted Successfully"
    });
});


module.exports = { createProject, getAllProject, getProjectById, updateProject, deleteProject };
