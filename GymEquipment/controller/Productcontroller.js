

const category = require("../models/category");
const products = require("../models/products");

const asyncErrorHandler = require("../utils/asyncErrorHandler");


const AddProduct = asyncErrorHandler(async (req, res, next) => {
    const body = req.body;

    if (req.file) {
        body.ProductImage = req.file.filename;
    }


    const CategoryidExists = await category.findByPk(body.CategoryId);

    if (!CategoryidExists) {
        return res.status(400).json({
            status: false,
            message: "Invalid CategoryId",
        });
    }


    const result = await products.create({
        CategoryId: body.CategoryId,
        ProductName: body.ProductName,
        Weight: body.Weight,
        Discount: body.Discount,
        ProductShortDesc: body.ProductShortDesc,
        ProductLongDesc: body.ProductLongDesc,
        ProductImage: body.ProductImage,
        Price: body.Price,
        StockQuantity: body.StockQuantity,
        ProductStatus: body.ProductStatus,
    });



    res.json({
        staus: true,
        message: "Product Created Succes",
        data: result,
    })
});

const getProduct = asyncErrorHandler(async (req, res, next) => {
    const categoryId = req.query.CategoryId;

    if (!categoryId) {
        return res.status(404).json({
            status: false,
            message: "CategoryId is required"
        })
    }

    const result = await products.findAll({
        where: { CategoryId: categoryId }, attributes: {
            exclude: [
                'createdAt', 'updatedAt', 'deletedAt'
            ]
        }
    });
    if (!result) {
        return res.status(404).json({
            status: false,
            message: "No Data Found"
        });
    }

    res.json({
        status: true,
        Products: result,
    })



});

const getProductDetail = asyncErrorHandler(async (req, res, next) => {
    const productId = req.query.ProductId;

    if (!productId) {
        return res.status(404).json({
            status: false,
            message: "ProductId is required"
        })
    }

    const result = await products.findOne({
        where: { ProductId: productId }, attributes: {
            exclude: [
                'createdAt', 'updatedAt', 'deletedAt'
            ]
        }
    });
    if (!result) {
        return res.status(404).json({
            status: false,
            message: "No Data Found"
        });
    }

    res.json({
        status: true,
        ProductDetails: result,
    })



});

module.exports = { AddProduct, getProduct, getProductDetail };