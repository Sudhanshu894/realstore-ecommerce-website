const ErrorHandler = require("../utils/ErrorHandling");

module.exports = (err, req, res, next) => {
    err.statusCode = err.status || 500;
    err.message = err.message || "Internal Server Error";


    // mongodb cast error handling
    if (err.name === "CastError") {
        const message = `Resource Not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 404);
    }


    return res.status(err.statusCode).send({
        error: err.message,
        success: false
    })
}