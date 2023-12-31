const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {
    signupUser: async (req, res) => {
      try {
        const { username, email, password, role } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
  
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role: role
        });
    
          const savedUser = await newUser.save();
          res.status(201).json({ success: true, message: 'User created successfully', userId: savedUser._id });
        } catch (error) {
          res.status(500).json({ success: false, message: 'Error signing up', error: error.message });
        }
      },
      loginUser: async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
  
          if (user && bcrypt.compareSync(password, user.password)) {
              res.json({ 
                  success: true, 
                  message: 'Authentication successful!',
                  userId: user._id,
                  username: user.username,
                  userRole: user.role
              });
          } else {
              res.status(401).json({ success: false, message: 'Authentication failed. User not found or password incorrect.' });
          }
      } catch (error) {
          res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
      }
      },
    signoutUser: async (req, res) => {
      req.session.destroy(err => {
          if (err) {
              res.status(500).json({ success: false, message: 'Error signing out', error: err.message });
          } else {
              res.json({ success: true, message: 'Sign out successful' });
          }
      });
    }
};

module.exports = authController;





