const Story = require('../models/Story');

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStory = async (req, res) => {
  const { title, content, author } = req.body;
  const newStory = new Story({
    title,
    content,
    author
  });

  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStoriesByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const stories = await Story.find({ category: categoryId }).populate('category');
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  