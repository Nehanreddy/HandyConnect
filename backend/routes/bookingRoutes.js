const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createBooking,
  getMyBookings,
  getBookingsByCityAndService,
  updateBookingStatus,
} = require('../controllers/bookingController');

// Create a new booking (authenticated user)
router.post('/', authMiddleware, createBooking);

// Get all bookings for the logged-in user
router.get('/my', authMiddleware, getMyBookings);

// Get bookings by city (for workers)
router.get('/by-city', getBookingsByCityAndService); // optionally add worker auth

// Update booking status (accepted/rejected)
router.put('/:id/status', updateBookingStatus); // optionally add worker auth

module.exports = router;
