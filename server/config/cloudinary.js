// NEW FILE: This file configures our connection to Cloudinary.

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// This configures a storage instance with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bloom-store', // A folder name in your Cloudinary account
        allowed_formats: ['jpeg', 'png', 'jpg'],
        // This transformation resizes images to a manageable size
        transformation: [{ width: 800, height: 600, crop: 'limit' }] 
    }
});

module.exports = {
    cloudinary,
    storage
};