const express = require('express');
const { PaymentProcess, SendStripApiKey } = require('../controllers/PaymentController');

const router = express.Router();

const { IsAuthenticated } = require('../middleware/auth');


router.route('/payment/process').post(IsAuthenticated, PaymentProcess);
router.route('/stripeapikey').get(IsAuthenticated, SendStripApiKey);


module.exports = router;