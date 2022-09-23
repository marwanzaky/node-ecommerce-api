const paymentController = require('../controllers/paymentController.js');
const express = require('express');

const router = express.Router();

router
    .route('/create-checkout-session')
    .post(paymentController.createCheckoutSession);

module.exports = router;