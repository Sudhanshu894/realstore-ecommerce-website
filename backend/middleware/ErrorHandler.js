const ErrorHandler = require("../utils/ErrorHandling");

module.exports = (err, req, res, next) => {
    err.statusCode = err.status || 500;
    err.message = err.message || "Internal Server Error";


    // mongodb cast error handling
    if (err.name === "CastError") {
        const message = `Resource Not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 404);
    }


    // Duplicate Key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 404);
    }


    // JWT Error 
    if (err.name === 'JsonWebTokenError') {
        const message = `Jwt token is Invalid, please try again later`;
        err = new ErrorHandler(message, 404);
    }



    // JWt Expire Error 
    if (err.name === 'TokenExpiredError') {
        const message = 'JWT token is expired. Try again later';
        err = new ErrorHandler(message, 404);
    }
    return res.status(err.statusCode).send({
        error: err.message,
        success: false
    })
}



