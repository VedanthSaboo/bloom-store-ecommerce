// NEW FILE: This controller handles creating a payment order with Razorpay and verifying the payment.

const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

// @desc    Verify payment signature
// @route   POST /api/payment/verify-payment
// @access  Private
exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        res.json({ status: 'success', orderId: razorpay_order_id });
    } else {
        res.status(400).json({ status: 'failure' });
    }
};
// UPDATED: The createOrder function now saves payment details.

const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

// ... generateInvoiceNumber function remains the same ...

// @desc    Create a new order after successful payment
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice, isGift, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            totalPrice,
            isGift,
            isPaid: true,
            paidAt: Date.now(),
            status: 'Paid',
            paymentResult,
        });
        const createdOrder = await order.save();
        
        // ... stock and invoice logic remains the same ...

        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("ERROR CREATING ORDER:", error);
        res.status(500).json({ message: 'Server error creating order', error: error.message });
    }
};