const mongoose = require('mongoose');
const User = require('./models/User');
const Story = require('./models/Story');
const Comment = require('./models/Comment');
const Category = require('./models/Category');
const Advertisement = require('./models/Advertisement');

// Database URL
const dbUrl = 'mongodb://localhost:27017/daily_bugle_db';


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const seedUsers = [
  { username: 'user1', email: 'user1@example.com', password: 'password123' },
  { username: 'user2', email: 'user2@example.com', password: 'password123' },
];

const seedStories = [
  { title: 'Story 1', content: 'Content for story 1', author: null },
];

const seedCategories = [
  { name: 'Technology' },
];

const seedAdvertisements = [
  { title: 'Ad 1', imageUrl: 'http://imageurl.com/ad1.jpg', link: 'http://ad1.com' },
];

// Seed function
async function seedDB() {
  try {
    // Clean up the existing data
    await User.deleteMany({});
    await Story.deleteMany({});
    await Comment.deleteMany({});
    await Category.deleteMany({});
    await Advertisement.deleteMany({});

    // Insert the seed data
    const createdUsers = await User.insertMany(seedUsers);
    // Update stories with author ID
    seedStories.forEach((story, i) => {
      story.author = createdUsers[i % createdUsers.length]._id;
    });
    await Story.insertMany(seedStories);
    await Category.insertMany(seedCategories);
    await Advertisement.insertMany(seedAdvertisements);

    console.log('Database seeded!');
    console.log('Users inserted:', createdUsers);

  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDB();
