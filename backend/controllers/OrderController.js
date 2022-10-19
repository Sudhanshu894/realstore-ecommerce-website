const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandling');
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');


// Create new Order

exports.CreateOrder = AsyncErrorHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        totalPrice,
        taxPrice,
        itemsPrice,
        shippingPrice,
        paymentInfo,
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        taxPrice,
        itemsPrice,
        shippingPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    })


    return res.status(200).send({ order, success: true });
})


// Get Order By Id -- admin
exports.GetOneOrder = AsyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");


    if (!order) {
        return next(new ErrorHandler("No orders Found", 404));
    }

    return res.status(200).send({ order, success: true });
})


// Get login user order
exports.GetUserOrder = AsyncErrorHandler(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
        return next(new ErrorHandler("No orders Found", 404));
    }

    return res.status(200).send({ order, success: true });
});


// Get all Orders -- admin
exports.getAllOrders = AsyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    return res.status(200).send({
        success: true,
        totalAmount,
        orders,
    });
});

// update Order status -- admin
exports.updateOrder = AsyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    return res.status(200).send({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = AsyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found associated with this id", 404));
    }

    await order.remove();

    return res.status(200).send({
        success: true,
    });
});