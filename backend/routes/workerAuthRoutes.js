const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  workerSignup,
  workerLogin,
  getWorkerProfile,
  resetWorkerPassword,
} = require('../controllers/workerAuthController');
const { protectWorker } = require('../middleware/workerAuthMiddleware');

router.post(
  '/signup',
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 }
  ]),
  workerSignup
);

router.post('/login', workerLogin);
router.post('/reset-password', resetWorkerPassword);
router.get('/profile', protectWorker, getWorkerProfile);

module.exports = router;
