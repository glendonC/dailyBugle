const Story = require('../models/Story');

exports.getAllStories = async (req, res) => {
  try {
    let query = {};
    const search = req.query.search;
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive regex search
    }
    const stories = await Story.find(query).populate('author', 'username'); // Assuming you want to populate the author's username
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


exports.createStory = async (req, res) => {
  const { title, content, author, category } = req.body;
  const newStory = new Story({
    title,
    content,
    author,
    category
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
  
  