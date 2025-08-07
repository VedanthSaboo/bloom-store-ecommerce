// This is the complete file with the updated createOrder function.

const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

// Helper function to generate a unique invoice number
const generateInvoiceNumber = async () => {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    if (lastInvoice && lastInvoice.invoiceNumber) {
        const lastNum = parseInt(lastInvoice.invoiceNumber.split('-')[1]);
        return `INV-${lastNum + 1}`;
    }
    return 'INV-1001';
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice, isGift, paymentMethod, paymentResult } = req.body;

    const city = shippingAddress.city.toLowerCase();
    const country = shippingAddress.country.toLowerCase();

    if (city !== 'jaipur' || country !== 'india') {
        return res.status(400).json({ message: 'Sorry, we currently only deliver to Jaipur, Rajasthan.' });
    }

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
            paymentMethod,
            isPaid: paymentMethod === 'Razorpay',
            paidAt: paymentMethod === 'Razorpay' ? Date.now() : null,
            status: paymentMethod === 'Razorpay' ? 'Paid' : 'Pending',
            paymentResult: paymentMethod === 'Razorpay' ? paymentResult : {},
        });
        const createdOrder = await order.save();
        
        for (const item of createdOrder.orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        const user = await User.findById(req.user.id);
        const invoiceNumber = await generateInvoiceNumber();
        const invoice = new Invoice({
            order: createdOrder._id,
            invoiceNumber,
            customerDetails: {
                username: user.username,
                email: user.email,
                contactNumber: user.contactNumber,
            },
            shippingAddress: createdOrder.shippingAddress,
            items: createdOrder.orderItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price,
            })),
            subtotal: createdOrder.totalPrice,
            total: createdOrder.totalPrice,
        });
        await invoice.save();

        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("ERROR CREATING ORDER:", error);
        res.status(500).json({ message: 'Server error creating order', error: error.message });
    }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private (User)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching orders', error: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id username email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching all orders', error: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            const oldStatus = order.status;
            const newStatus = req.body.status;

            if (oldStatus !== 'Cancelled' && newStatus === 'Cancelled') {
                for (const item of order.orderItems) {
                    const product = await Product.findById(item.product);
                    if (product) {
                        product.stock += item.quantity;
                        await product.save();
                    }
                }
            }

            order.status = newStatus;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error updating order status', error: error.message });
    }
};
