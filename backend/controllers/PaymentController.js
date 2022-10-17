const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');
const stripe = require('stripe')("sk_test_51LstHMSFYVbGWksabDz0mYdI74BVPV0TMK5cSq1vwE86Bs3yWlBwDUXvegu9T5iOeOAsUU5Uh1GFdccbKdmvsdzA00yLEjwux7")

exports.PaymentProcess = AsyncErrorHandler(async (req, res, next) => {
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "RealStore",
        }
    });
    return res.status(200).send({ success: true, client_secret: payment.client_secret });
});


exports.SendStripApiKey = AsyncErrorHandler(async (req, res, next) => {
    return res.status(200).send({ stripekey: process.env.STRIPE_API_KEY });
})

