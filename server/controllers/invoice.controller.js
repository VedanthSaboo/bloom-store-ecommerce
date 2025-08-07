// This controller will handle fetching and updating invoices.

const Invoice = require('../models/invoice.model');

// @desc    Get invoice by order ID
// @route   GET /api/invoices/order/:orderId
// @access  Private (Admin)
exports.getInvoiceByOrderId = async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ order: req.params.orderId });
        if (invoice) {
            res.json(invoice);
        } else {
            res.status(404).json({ message: 'Invoice not found for this order' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching invoice', error: error.message });
    }
};

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private (Admin)
exports.updateInvoice = async (req, res) => {
    try {
        const { items, notes } = req.body;
        const invoice = await Invoice.findById(req.params.id);
        if (invoice) {
            invoice.items = items || invoice.items;
            invoice.notes = notes || invoice.notes;
            const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            invoice.subtotal = subtotal;
            invoice.total = subtotal;
            const updatedInvoice = await invoice.save();
            res.json(updatedInvoice);
        } else {
            res.status(404).json({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating invoice', error: error.message });
    }
};