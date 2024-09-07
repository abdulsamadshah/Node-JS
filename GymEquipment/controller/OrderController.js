const Orders = require('../models/orders');
const OrderItems = require('../models/orderitems');
const user = require("../models/user");
const Cart = require("../models/cart");
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const cart = require('../models/cart');
const { format } = require('date-fns');
const AppError = require('../utils/appError');


const CreateOrder = asyncErrorHandler(async (req, res, next) => {
    try {
        const userid = req.user.id;
        const { street, address, city, state, pincode, PaymentMethod } = req.body;
        const cartItems = await Cart.findAll({ where: { createdBy: userid } });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cart is empty or not found',
            });
        }

        const orderData = await Orders.create({
            item: cartItems.length,
            OrderStatus: 'Pending',
            street,
            address,
            city,
            state,
            pincode,
            grandTotal: cartItems.reduce((total, item) => total + (item.Price * item.Qty), 0),
            PaymentMethod,
            createdBy: req.user.id,
        });


        const orderItemsData = cartItems.map((item) => ({
            Orderid: orderData.Orderid,
            ProductId: item.ProductId,
            ProductName: item.ProductName,
            Weight: item.Weight,
            ProductShortDesc: item.ProductShortDesc,
            ProductImage: item.ProductImage,
            Price: item.Price,
            Qty: item.Qty,
        }));


        const Orderitems = await OrderItems.bulkCreate(orderItemsData);

        await cart.destroy({ where: { createdBy: userid } });

        res.json({
            status: 'success',
            data: {
                orderData,
                Orderitems,
            },
        });
    } catch (error) {
        return next(new Error(`Failed to create order:${error}`));
    }
});

const OrdersData = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const Order_Data = await Orders.findAll({ where: { createdBy: userId, OrderStatus: req.query.OrderStatus } });

    const orderDataJson = Order_Data.map(order => {
        const orderJson = order.toJSON();
        delete orderJson.street;
        delete orderJson.address;
        delete orderJson.city;
        delete orderJson.state;
        delete orderJson.pincode;
        delete orderJson.createdBy;
        delete orderJson.createdAt;
        delete orderJson.updatedAt;
        delete orderJson.deletedAt;
        return {
            ...orderJson,

            OrderDate: format(new Date(orderJson.OrderDate), 'dd-MMM-yyyy')
        };
    });

    res.json({
        status: true,
        message: `${Order_Data.length == 0 ? "No Order Found" : "Fetched Orders"}`,
        Order_Data: orderDataJson,
    })

});


const OrdersDetailsData = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const OrderId = req.query.Orderid;


    //-------------------------------- Orders Detail ------------------------- //
    const Order_Data = await Orders.findOne({ where: { createdBy: userId, Orderid: OrderId } });

    const orderJson = Order_Data.toJSON();
    delete orderJson.createdBy;
    delete orderJson.createdAt;
    delete orderJson.updatedAt;
    delete orderJson.deletedAt;
    const { street, address, city, state, pincode } = orderJson;
    delete orderJson.street;
    delete orderJson.address;
    delete orderJson.city;
    delete orderJson.state;
    delete orderJson.pincode;


    orderJson.OrderDate = format(new Date(orderJson.OrderDate), 'dd-MMM-yyyy | hh:mm a');



    //--------------------- Order Items ************************* //
    const newOrderItem = await GetOrderItems(OrderId);


    //+++++++++++++++++++++++++ Customer Details --------------------- //
    const userdata = await user.findOne({ where: { id: userId } });

    const CustomerData = {
        street, address, city, state, pincode,
        Name: userdata.Name,
        MobileNo: userdata.MobileNo,
        email: userdata.email,

    }


    res.json({
        status: true,
        message: `${Order_Data.length == 0 ? "No OrderItem Found" : "Fetched OrdersItems"}`,
        Order_Data: orderJson,
        OrderItems: newOrderItem,
        CustomerData,
    });




});

const updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const OrderId = req.body.Orderid;

    if (!OrderId) {
        return next(new AppError("OrderId is required"))
    } else if (!OrderStatus) {
        return next(new AppError("OrderStatus is required"))
    }
    
    //-------------------------------- Orders Detail ------------------------- //
    const Order_Data = await Orders.findOne({ where: { createdBy: userId, Orderid: OrderId } });

    Order_Data.OrderStatus = req.body.OrderStatus;

    await Order_Data.save();

    res.json({
        status: true,
        message: "OrderStatus Updated Successfully",
    });


})




module.exports = {
    CreateOrder,
    OrdersData,
    OrdersDetailsData,
    updateOrderStatus
};



async function GetOrderItems(OrderId) {
    const OrderItem = await OrderItems.findAll({
        where: { Orderid: OrderId }, attributes: {
            exclude: [
                'createdAt', 'updatedAt', 'deletedAt', 'Orderid', 'id', 'ProductId'
            ]
        }
    });

    const newOrderItem = OrderItem.map(ordersitems => {
        const ordersItem = ordersitems.toJSON();
        ordersItem.totalAmount = ordersItem.Qty * ordersItem.Price;
        return ordersItem;
    });

    
    return newOrderItem;
}