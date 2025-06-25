const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createBooking, getMyBookings } = require('../controllers/bookingController');

// Create a new booking (authenticated user)
router.post('/', authMiddleware, createBooking);

// Get all bookings for the logged-in user
router.get('/my', authMiddleware, getMyBookings);

module.exports = router;
