const express = require('express');
const app = express();
const errorHandler = require('./middleware/ErrorHandler');
const ProductController = require('./routes/ProductRoute');
const UserController = require('./routes/UserRoute');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//Product Api Call
app.use('/api', ProductController);


// User login Signup Api Call
app.use('/api', UserController)

// ErrorHandler Middleware
app.use(errorHandler);

module.exports = app;