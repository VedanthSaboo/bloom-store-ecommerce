// UPDATED: Re-enabled admin authentication for product management.

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const adminAuth = require('../middleware/auth.middleware');
const userAuth = require('../middleware/userAuth.middleware');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    searchProducts
} = require('../controllers/product.controller');

// Public routes
router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// User review route
router.post('/:id/reviews', userAuth, createProductReview);

// Admin routes (SECURITY RE-ENABLED)
router.post('/', adminAuth, upload.single('image'), createProduct);
router.put('/:id', adminAuth, upload.single('image'), updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

module.exports = router;