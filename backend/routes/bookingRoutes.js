const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { protectWorker } = require('../middleware/workerAuthMiddleware');
const {
  createBooking,
  getMyBookings,
  getBookingsByCityAndService,
  updateBookingStatus,
  getUserBookingsWithWorkers,
  markBookingCompleted,     // 🆕 ADD: Missing import
  rateBooking,             // 🆕 ADD: Missing import
  getWorkerCompletedJobs   // 🆕 ADD: Missing import
} = require('../controllers/bookingController');

// Create a new booking (authenticated user)
router.post('/', authMiddleware, createBooking);

// Get all bookings for the logged-in user
router.get('/my', authMiddleware, getMyBookings);

// Get user bookings with worker details
router.get('/my-services', authMiddleware, getUserBookingsWithWorkers);

// Get bookings by city and service type (for workers)
router.get('/by-city', getBookingsByCityAndService);

// Add worker authentication to status update
router.put('/:id/status', protectWorker, updateBookingStatus);

// 🆕 NEW ROUTES - Add these missing routes:
router.put('/:id/complete', protectWorker, markBookingCompleted);
router.put('/:id/rate', authMiddleware, rateBooking);
router.get('/worker/completed', protectWorker, getWorkerCompletedJobs);

module.exports = router;
