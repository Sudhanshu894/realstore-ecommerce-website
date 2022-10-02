const Product = require('../models/ProductModel');
const ErrorHandler = require('../utils/ErrorHandling');
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');
const ApiFeatures = require('../utils/feature');


// Create Products
exports.createProduct = AsyncErrorHandler(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).send({ product, success: true })
});



// Get Products 
exports.getAllProducts = AsyncErrorHandler(async (req, res, next) => {
    const resperpage = 2;
    const totalProducts = await Product.countDocuments();
    const queryFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resperpage)
    let product = await queryFeature.query;
    return res.status(201).send({ product, totalProducts, success: true });
});



// Update Products
exports.updateProducts = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

    } else {
        products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).send({ products, success: true });
    }
})


// Get All products details from Id
exports.getProductDetails = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(201).send({ success: true, product });
})



// Delete Products Details 
exports.deleteProducts = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(201).send({ success: true, message: "Product deleted successfully" });
});