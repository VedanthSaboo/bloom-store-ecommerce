// This is the complete file with the 'contactNumber' field added to shippingAddress.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        contactNumber: { type: String, required: true } // New field
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isGift: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    paymentResult: {
        razorpay_payment_id: { type: String },
        razorpay_order_id: { type: String },
        razorpay_signature: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);