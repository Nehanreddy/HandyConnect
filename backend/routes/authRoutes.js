const express = require('express');
const router = express.Router();


const { signup, login, resetPassword } = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', signup);


// POST /api/auth/login
router.post('/login', login);
router.post('/reset-password', resetPassword);

module.exports = router;
