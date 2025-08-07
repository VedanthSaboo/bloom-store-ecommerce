// This file defines the API route for the service enquiry.

const express = require('express');
const router = express.Router();
const { submitEnquiry } = require('../controllers/service.controller');

router.post('/enquiry', submitEnquiry);

module.exports = router;