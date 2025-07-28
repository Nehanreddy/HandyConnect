const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { protectWorker } = require('../middleware/workerAuthMiddleware'); // 🆕 Import your middleware
const {
  createBooking,
  getMyBookings,
  getBookingsByCityAndService,
  updateBookingStatus,
  getUserBookingsWithWorkers,
} = require('../controllers/bookingController');

// Create a new booking (authenticated user)
router.post('/', authMiddleware, createBooking);

// Get all bookings for the logged-in user
router.get('/my', authMiddleware, getMyBookings);

// 🆕 Get user bookings with worker details
router.get('/my-services', authMiddleware, getUserBookingsWithWorkers);

// Get bookings by city and service type (for workers)
router.get('/by-city', getBookingsByCityAndService);

// 🔄 Add worker authentication to status update
router.put('/:id/status', protectWorker, updateBookingStatus);

module.exports = router;
