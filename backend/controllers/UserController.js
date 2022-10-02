const ErrorHandler = require('../utils/ErrorHandling');
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');
const User = require('../models/UserModel');
const SendToken = require('../utils/Token');

exports.registerUser = AsyncErrorHandler(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
        return next(new ErrorHandler("User already Exists", 404));
    }
    const cruser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample Id",
            url: "profile_Pic_Url",
        }
    });
    const token = cruser.getJwtToken();
    return res.status(201).send({ cruser, token, success: true });
})



// Login User
exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter valid credentials", 404));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User doesn't exists", 404));
    }

    const matchPassword = user.comparePassword(password);

    if (!matchPassword) {
        return next(new ErrorHandler("Invalid email or password", 404));
    }
    SendToken(user, 201, res);
})