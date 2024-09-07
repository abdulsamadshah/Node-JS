const { status } = require("express/lib/response");
const cart = require("../models/cart");
const products = require("../models/products");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const AppError = require("../utils/appError");
const { FORCE } = require("sequelize/lib/index-hints");


const AddToCart = asyncErrorHandler(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;
    const productId = req.body.ProductId;

    const ProductDetails = await products.findOne({ where: { ProductId: productId } });


    let totalprice = body.Qty * ProductDetails.Price;

    await cart.create({
        ProductId: ProductDetails.ProductId,  // Add this line
        ProductName: ProductDetails.ProductName,
        Weight: ProductDetails.Weight,
        Discount: ProductDetails.Discount,
        ProductShortDesc: ProductDetails.ProductShortDesc,
        ProductLongDesc: ProductDetails.ProductLongDesc,
        ProductImage: ProductDetails.ProductImage,
        Price: ProductDetails.Price,
        StockQuantity: ProductDetails.StockQuantity,
        ProductStatus: ProductDetails.ProductStatus,
        CategoryId: ProductDetails.CategoryId,
        createdBy: userId,
        Qty: body.Qty,
        totalPrice: totalprice,

    });


    res.json({
        status: true,
        message: "Add to Cart Success",
    })
});


const CartData = asyncErrorHandler(async (req, res, next) => {
    const userid = req.user.id;

    const result = await cart.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'Weight', 'Discount', 'createdBy', 'CategoryId']
        }, where: { createdBy: userid }
    });

    let grandTotal = 0;
    result.forEach(item => {
        grandTotal += item.totalPrice;
    });



    res.json({
        status: true,
        message: `${result.length == 0 ? "Data not Found" : "Data fetched Successfully"}`,
        CartData: result,
        grandTotal: grandTotal,
    })
});

const deleteCartItem = asyncErrorHandler(async (req, res, next) => {
    const userid = req.user.id;
    const CartId = req.query.CartId;

    if (!CartId) {
        return res.status(404).json({
            status: false,
            message: "CartId is required",
        });
    }

    const result = await cart.findOne({ where: { CartId: CartId, createdBy: userid } });



    if (!result) {
        return next(new AppError("Invalid CartId", 400));
    }
    await result.destroy({ force: true }); // Use force if needed

    res.json({
        status: true,
        message: "Deleted Successfully",

    });
});


const UpdateCartItem = asyncErrorHandler(async (req, res, next) => {
    const body = req.body;
    const userid = req.user.id;
    const CartId = req.body.CartId;

    if (!CartId) {
        return res.status(404).json({
            status: false,
            message: "CartId is required",
        });
    }

    if (!CartId) {
        return res.status(404).json({
            status: false,
            message: "CartId is required",
        });
    }

    const result = await cart.findOne({ where: { CartId: CartId, createdBy: userid } });


    result.Qty = body.Qty;
    result.totalPrice = body.Qty * result.Price;

    if (!result) {
        return next(new AppError("Invalid CartId", 400));
    }

    await result.save();

    res.json({
        status: true,
        message: "Updated Successfully",

    });
});


module.exports = { AddToCart, CartData, deleteCartItem, UpdateCartItem }