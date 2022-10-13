const AsyncErrorHandler = require("./AsyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandling");
const Jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.IsAuthenticated = AsyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to Access the Resources", 404));
    }

    const DecodedUserdata = Jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(DecodedUserdata.id);

    next();
})

exports.RolesBasedAuthorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not allowed to access these resources`, 401));
        }

        next();
    }
}