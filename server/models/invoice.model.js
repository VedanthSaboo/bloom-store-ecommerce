// This is the complete file with contact numbers added to customerDetails and shippingAddress.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    customerDetails: {
        username: String,
        email: String,
        contactNumber: String // New field for account contact number
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
        contactNumber: String // New field for shipping contact number
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    notes: { type: String, default: 'Thank you for your purchase!' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);