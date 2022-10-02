const AsyncErrorHandler = require("./AsyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandling");
const Jwt = require('jsonwebtoken');

exports.IsAuthenticated = AsyncErrorHandler(async (req, res, next) => {
    const token = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to Access the Resources", 404));
    }

    const DecodedUserdata = Jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedUserdata._id);

    next();
})