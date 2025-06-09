const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  resetPassword,
  getProfile,
  updateProfile
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword);

// Protected User Routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
