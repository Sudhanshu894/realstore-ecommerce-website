const Product = require('../models/ProductModel');
const ErrorHandler = require('../utils/ErrorHandling');
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');
const ApiFeatures = require('../utils/feature');
const cloudinary = require('cloudinary');


// Create Products -- Admin
exports.createProduct = AsyncErrorHandler(async (req, res) => {
    let imageLinks = [];
    for (let i = 0; i < req.body.images?.length; i++) {
        const elem = await cloudinary.v2.uploader.upload(req.body.images[i], {
            folder: "Products",
        })
        imageLinks.push({
            public_id: elem.public_id,
            url: elem.secure_url,
        });
    }
    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).send({ product, success: true })
});



// Get Products 
exports.getAllProducts = AsyncErrorHandler(async (req, res, next) => {
    const resultPerPage = 6;
    const product = new ApiFeatures(Product.find(), req.query).search().filter();
    const temp = await product.query;
    const totalProducts = temp.length;
    const queryFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    let products = await queryFeature.query;
    return res.status(201).send({ products, totalProducts, resultPerPage, success: true });
});



// Update Products -- admin
exports.updateProducts = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

    }

    if (product.images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    }

    let imageLinks = [];
    for (let i = 0; i < req.body.images?.length; i++) {
        const elem = await cloudinary.v2.uploader.upload(req.body.images[i], {
            folder: "Products",
        })
        imageLinks.push({
            public_id: elem.public_id,
            url: elem.secure_url,
        });
    }
    req.body.images = imageLinks;

    products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(201).send({ product, success: true });
})


// Get All products details from Id
exports.getProductDetails = AsyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'user', model: 'users' } });
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(201).send({ success: true, product });
})



// Delete Products Details -- admin
exports.deleteProducts = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(201).send({ success: true, message: "Product deleted successfully" });
});



//Create and Update Product Review
exports.CreateAndUpdateReview = AsyncErrorHandler(async (req, res, next) => {

    const { rating, review, productId } = req.body;

    const data = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        review: review,
    };

    const product = await Product.findById(productId);
    const IsReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (IsReviewed) {
        product.reviews.forEach(rev => {
            rev.rating = rating
            rev.review = review
        })
    } else {
        product.reviews.push(data);
        product.numOfreviews = product.reviews.length;
    }
    let average = 0;
    product.reviews.forEach(r => {
        average += r.rating
    });
    product.ratings = Math.ceil(average / product.reviews.length);

    await product.save({ validateBeforeSave: false });

    return res.status(200).send({ success: true });
})



// Get Product review for specified product
exports.GetProductRevies = AsyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId).populate({ path: 'reviews', populate: { path: 'user', model: 'users' } });

    if (!product) {
        return next(new Error('Product not found', 404));
    }

    return res.status(200).send({ success: true, reviews: product.reviews });
});


// Delete Product review
exports.DeleteReview = AsyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new Error('Product not found', 404));
    }

    const reviews = product.reviews.filter(txt => txt._id.toString() !== req.query.id.toString());


    let average = 0;
    reviews.forEach(review => {
        average += review.rating
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = average / reviews.length;
    }
    const numOfreviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfreviews,
    }, {
        new: true,
        runValidators: true,
    });


    return res.status(200).send({ success: true });
})



exports.AdminAllProducts = AsyncErrorHandler(async (req, res, next) => {

    const products = await Product.find();

    return res.status(201).send({ products, success: true });
});