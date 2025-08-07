// NEW FILE: Defines API routes for payment actions.

const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require('../controllers/payment.controller');
const userAuth = require('../middleware/userAuth.middleware');

router.post('/create-order', userAuth, createRazorpayOrder);
router.post('/verify-payment', userAuth, verifyPayment);

module.exports = router;