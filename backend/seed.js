const mongoose = require('mongoose');
const User = require('./models/User');
const Story = require('./models/Story');
const Comment = require('./models/Comment');
const Category = require('./models/Category');
const Advertisement = require('./models/Advertisement');
const bcrypt = require('bcryptjs');

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


const seedStories = [
  { title: 'Story 1', content: 'Content for story 1', author: null },
  // Add more stories if needed
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

    // Insert the seed data for categories
    const createdCategories = await Category.insertMany(seedCategories);
    // Assuming you're creating only one category, use its ID for all stories
    const categoryId = createdCategories[0]._id;

    // Update stories with author ID and category ID
    seedStories.forEach(story => {
      story.author = seedUsers[0]._id; // Assign first user's ID as author for all stories
      story.category = categoryId; // Assign the created category ID to all stories
    });
    await hashPasswords(seedUsers);
    
    // Insert the seed data for users, stories, and advertisements
    const createdUsers = await User.insertMany(seedUsers);
    await Story.insertMany(seedStories);
    await Advertisement.insertMany(seedAdvertisements);

    console.log('Database seeded!');
    console.log('Categories inserted:', createdCategories);
    console.log('Users inserted:', createdUsers);

  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}


// Run the seed function
seedDB();
