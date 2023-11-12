const express = require('express');
const router = express.Router();

const {
  getAllStories,
  createStory,
  getStoriesByCategory,
  getStoriesByAuthor,
  updateStory
} = require('../controllers/storiesController');

router.get('/', getAllStories); // Get all stories
router.post('/', createStory); // Create a new story
router.get('/category/:categoryId', getStoriesByCategory); // Get stories by category ID
router.get('/author/:userId', getStoriesByAuthor); // Get stories by author ID
router.put('/:storyId', updateStory); // Correct route for updating a story



module.exports = router;
