require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adRoutes = require('./routes/adRoutes');

const app = express();

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Daily Bugle!' });
});

// Use Routes
app.use('/api/stories', storyRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ads', adRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
