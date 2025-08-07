// Defines the API routes for invoices.

const express = require('express');
const router = express.Router();
const { getInvoiceByOrderId, updateInvoice } = require('../controllers/invoice.controller');
const adminAuth = require('../middleware/auth.middleware');

router.get('/order/:orderId', adminAuth, getInvoiceByOrderId);
router.put('/:id', adminAuth, updateInvoice);

module.exports = router;