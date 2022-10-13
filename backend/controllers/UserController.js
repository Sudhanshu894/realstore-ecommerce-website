const ErrorHandler = require('../utils/ErrorHandling');
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');
const User = require('../models/UserModel');
const SendToken = require('../utils/Token');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const sendEmail = require('../utils/Email.js');


exports.registerUser = AsyncErrorHandler(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "user_profiles",
        width: 150,
        crop: "scale"
    })
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
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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

    const matchPassword = await user.comparePassword(password);
    console.log("match:", matchPassword);
    if (!matchPassword) {
        return next(new ErrorHandler("Invalid email or password", 404));
    }
    SendToken(user, 201, res);
})



// Logout User
exports.logoutUser = AsyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).send({
        success: true,
        message: "User logout successful",
    });
});



// User forget Password Endpoint
exports.forgetUserPassword = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not Found"), 404);
    }
    const newToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });


    const forgetPassUrl = `http://localhost:3000/api/password/reset/${newToken}`;
    const message = `Your Password reset Link is : \n\n ${forgetPassUrl} \n\n if you have not requested to reset your password then please ignore this message`;


    try {
        await sendEmail({
            email: user.email,
            subject: `Realstore reset Password`,
            message: message,
        });

        return res.status(201).send({ message: `Email sent to ${user.email} successfully`, success: true });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        return next(new ErrorHandler(err.message, 500));
    }
})



// Reset Password
exports.resetPassword = AsyncErrorHandler(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                404
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not Match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    SendToken(user, 200, res);
});




// User Details
exports.getUserInfo = AsyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    return res.status(200).send({
        success: true, user
    })
})



// Upadate user password
exports.changeUserPassword = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword);

    if (!isMatched) {
        return next(new ErrorHandler("Invalid password or email", 404));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password mismatch", 404));
    }


    user.password = req.body.newPassword;

    await user.save();

    SendToken(user, 200, res);
})



// Update User Informations
exports.updateProfile = AsyncErrorHandler(async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== undefined) {
        const user = await User.findById(req.user.id);

        const imgid = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imgid);

        const Cloud_data = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "user_profiles",
            width: 150,
            crop: "scale",
        });

        data.avatar = {
            public_id: Cloud_data.public_id,
            url: Cloud_data.secure_url,
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, data, { new: true, runValidators: true })


    return res.status(200).send({ success: true });
})


// Fetch all users List
exports.GetAllUsers = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find();

    return res.status(200).send({ users, success: true })
});


// Fetch Specific User Info -- admin
exports.GetSpecificUser = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User Does Not Exist", 404));
    }

    return res.status(200).send({ user, success: true });
})



// Update Specific User Info -- admin
exports.UpdateUserRole = AsyncErrorHandler(async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
    });

    return res.status(200).send({ success: true });
});


// Delete Specific User -- admin
exports.DeleteUser = AsyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).send({ success: true })


});