// UPDATED: Re-enabled admin authentication for order management.

const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth.middleware');
const adminAuth = require('../middleware/auth.middleware');
const { 
    createOrder, 
    getMyOrders, 
    getAllOrders, 
    updateOrderStatus 
} = require('../controllers/order.controller');

// User routes
router.route('/myorders').get(userAuth, getMyOrders);
router.route('/').post(userAuth, createOrder);

// Admin routes (SECURITY RE-ENABLED)
router.route('/').get(adminAuth, getAllOrders);
router.route('/:id/status').put(adminAuth, updateOrderStatus);

module.exports = router;