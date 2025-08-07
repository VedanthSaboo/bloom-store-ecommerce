// UPDATED: Re-enabled admin authentication for dashboard stats.

const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/auth.middleware');
const { getStats } = require('../controllers/admin.controller');

// Admin routes (SECURITY RE-ENABLED)
router.get('/stats', adminAuth, getStats);

module.exports = router;