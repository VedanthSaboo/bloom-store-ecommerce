// NEW FILE: This file defines the schema for the 'Post' collection for blog articles.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // A slug is a URL-friendly version of the title
    slug: {
        type: String,
        required: true,
        unique: true
    },
    featuredImage: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);