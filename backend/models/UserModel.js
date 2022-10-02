const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        maxLength: [35, "Name should not exceeds 35 characters"],
        minLength: [3, "Name should be equal to or greater than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter a email address"],
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false,
        minLength: [8, "password must be at least 8 characters"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 8);
})

// create Jwt Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_DURATION,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('users', userSchema);