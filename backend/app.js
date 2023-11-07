require('dotenv').config();
const express = require('express'); // Add this line
const router = express.Router(); // Modify this line
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adRoutes = require('./routes/adRoutes');
const storiesController = require('./controllers/storiesController'); // Make sure you've required this

const app = express(); // Now express is defined

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:3001', // or use ['http://localhost:3000', 'http://localhost:3001'] if you want to allow multiple origins
  optionsSuccessStatus: 200 // For legacy browsers
};
app.use(cors(corsOptions));
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Test Route
app.get('/', storiesController.getAllStories); // Modify this line to use app instead of router

// Use Routes
app.use('/api/stories', storyRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ads', adRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
