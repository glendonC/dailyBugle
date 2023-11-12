const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const { content, author, story } = req.body;
  const newComment = new Comment({
    content,
    author,
    story
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId, 
      { content },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In your commentsController.js
exports.deleteComment = async (req, res) => {
  try {
      const commentId = req.params.commentId;
      // Additional logic to ensure the user is authorized to delete the comment
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
          return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};


exports.getCommentsByStory = async (req, res) => {
  try {
      const storyId = req.params.storyId;
      const comments = await Comment.find({ story: storyId }).populate('author', 'username'); // Assuming you want to populate author details
      res.json(comments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};