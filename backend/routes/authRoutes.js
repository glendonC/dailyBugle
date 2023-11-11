const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
//router.post('/signout', authController.signoutUser);

module.exports = router;
