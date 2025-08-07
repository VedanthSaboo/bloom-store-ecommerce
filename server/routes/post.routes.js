// UPDATED: Re-enabled admin authentication for blog management.

const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/auth.middleware');
const {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePost,
    deletePost
} = require('../controllers/post.controller');

// Public routes
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Admin routes (SECURITY RE-ENABLED)
router.post('/', adminAuth, createPost);
router.put('/:id', adminAuth, updatePost);
router.delete('/:id', adminAuth, deletePost);

module.exports = router;