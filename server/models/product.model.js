// UPDATED: Added a reviews array to the Product schema.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for individual reviews
const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Plants', 'Accessories', 'Compost/Fertilizers'] },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: false },
    reviews: [reviewSchema], // Added reviews array
    rating: { // Average rating
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);