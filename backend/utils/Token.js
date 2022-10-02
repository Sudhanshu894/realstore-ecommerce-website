const SendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    return res.status(statusCode).cookie("token", token, options).send({
        success: true,
        user,
        token
    })
}


module.exports = SendToken;