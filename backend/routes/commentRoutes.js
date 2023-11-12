const express = require('express');
const router = express.Router();
const { getAllComments, createComment, getCommentsByStory } = require('../controllers/commentsController');
const commentsController = require('../controllers/commentsController');

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/story/:storyId', getCommentsByStory);
router.put('/:commentId', commentsController.updateComment);
router.delete('/:commentId', commentsController.deleteComment);
module.exports = router;