const express = require('express');
const router = express.Router();
const { getAllStories, createStory } = require('../controllers/storiesController');

router.get('/', getAllStories); // Get all stories
router.post('/', createStory); // Create a new story

module.exports = router;
