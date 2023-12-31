require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adRoutes = require('./routes/adRoutes');
const authRoutes = require('./routes/authRoutes');
const storiesController = require('./controllers/storiesController');
const categoryRoutes = require('./routes/categoryRoutes');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3001', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', storiesController.getAllStories);
app.use('/api', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/categories', categoryRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
