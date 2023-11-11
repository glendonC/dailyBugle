const express = require('express');
const router = express.Router();
const { getAllComments, createComment, getCommentsByStory } = require('../controllers/commentsController');

// Existing routes
router.get('/', getAllComments);
router.post('/', createComment);

// Add this route
router.get('/story/:storyId', getCommentsByStory);

module.exports = router;