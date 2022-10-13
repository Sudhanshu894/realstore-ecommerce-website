const sendToken = (user, status, res) => {
    const token = user.getJwtToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(status).cookie("token", token, { ...options }).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;