const express = require('express');
const router = express.Router();
const {
  getAllStories,
  createStory,
  getStoriesByCategory
} = require('../controllers/storiesController');

router.get('/', getAllStories); // Get all stories
router.post('/', createStory); // Create a new story
router.get('/category/:categoryId', getStoriesByCategory); // Get stories by category ID

module.exports = router;
