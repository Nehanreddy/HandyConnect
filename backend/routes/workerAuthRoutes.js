const express = require('express');
const router = express.Router();
const { workerSignup, workerLogin, getWorkerProfile, resetWorkerPassword } = require('../controllers/workerAuthController');

const { protectWorker } = require('../middleware/workerAuthMiddleware');

// Public
router.post('/signup', workerSignup);
router.post('/login', workerLogin);
router.post('/reset-password', resetWorkerPassword);


// Protected
router.get('/profile', protectWorker, getWorkerProfile);

module.exports = router;
