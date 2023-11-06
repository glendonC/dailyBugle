const express = require('express');
const router = express.Router();
const { getAllComments, createComment } = require('../controllers/commentsController');

router.get('/', getAllComments); // Get all comments
router.post('/', createComment); // Create a new comment

module.exports = router;
