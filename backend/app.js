const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandler');
const ProductController = require('./routes/ProductRoute');
const UserController = require('./routes/UserRoute');
const OrderController = require('./routes/OrderRoute');
const PaymentController = require('./routes/PaymentRoute');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/configs/config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/api', PaymentController);
//Product Api Call
app.use('/api', ProductController);


// User login Signup Api Call
app.use('/api', UserController);
app.use('/api', OrderController);


// Payment Api Call


// ErrorHandler Middleware
app.use(errorHandler);

module.exports = app;