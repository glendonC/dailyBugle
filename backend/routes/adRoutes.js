const express = require('express');
const router = express.Router();
const { trackInteraction } = require('../controllers/advertisementsController');

// Track ad clicks
router.post('/ad/:adId/click', trackInteraction);

module.exports = router;
