const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Story = require('./models/Story');
const Comment = require('./models/Comment');
const Category = require('./models/Category');
const Advertisement = require('./models/Advertisement');

// Hash passwords for seed users
async function hashPasswords(users) {
  for (let user of users) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
}

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
  { username: 'user1', email: 'user1@example.com', password: 'password123', role: 'reader' },
  { username: 'user2', email: 'user2@example.com', password: 'password123', role: 'author' },
];

const seedCategories = [
  { name: 'Technology' },
  { name: 'Sports' },
  { name: 'Entertainment' },
  { name: 'Others' }
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

    // Hash passwords for users
    await hashPasswords(seedUsers);

    // Seed Users
    const createdUsers = await User.insertMany(seedUsers);
    console.log('Users seeded!');

    // Seed Categories
    const createdCategories = await Category.insertMany(seedCategories);
    console.log('Categories seeded!');

    const numberOfStories = 3; // Define how many stories you want to seed
    const seedStories = Array.from({ length: numberOfStories }, (_, index) => ({
      title: `Story ${index + 1}`,
      content: `Content for story ${index + 1}`,
      author: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
      category: createdCategories[Math.floor(Math.random() * createdCategories.length)]._id
    }));

    await Story.insertMany(seedStories);
    console.log('Stories seeded!');

    // Seed Advertisements
    await Advertisement.insertMany(seedAdvertisements);
    console.log('Advertisements seeded!');

  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDB();
