const express = require('express');
const router = express.Router();

const {
  getAllStories,
  createStory,
  getStoriesByCategory,
  getStoriesByAuthor,
  updateStory
} = require('../controllers/storiesController');

router.get('/', getAllStories);
router.post('/', createStory);
router.get('/category/:categoryId', getStoriesByCategory);
router.get('/author/:userId', getStoriesByAuthor);
router.put('/:storyId', updateStory);



module.exports = router;
