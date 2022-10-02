const express = require('express');
const app = express();
const errorHandler = require('./middleware/ErrorHandler');
const ProductController = require('./routes/ProductRoute');


app.use(express.json());

//Product Api Call
app.use('/api', ProductController)

// ErrorHandler Middleware
app.use(errorHandler);

module.exports = app;