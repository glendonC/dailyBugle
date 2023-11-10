const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
// Add a sign-out route if using session-based authentication
router.post('/signout', authController.signoutUser);

module.exports = router;
