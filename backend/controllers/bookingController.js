const Booking = require('../models/Booking');

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Private
exports.createBooking = async (req, res) => {
  const {
    serviceType,
    problem,
    urgency,
    bookingFor,
    serviceLocation,
    date,
    time,
    contactName,
    contactPhone,
    contactEmail,
  } = req.body;

  // Basic validation (backend safety)
  if (
    !serviceType || !problem || !urgency || !bookingFor ||
    !serviceLocation?.address || !serviceLocation?.city ||
    !date || !time || !contactName || !contactPhone || !contactEmail
  ) {
    return res.status(400).json({ msg: 'Please fill all required booking fields' });
  }

  try {
    const booking = new Booking({
      user: req.user.id, // comes from authMiddleware
      serviceType,
      problem,
      urgency,
      bookingFor,
      serviceLocation,
      date,
      time,
      contactName,
      contactPhone,
      contactEmail,
    });

    await booking.save();

    res.status(201).json({
      msg: '✅ Booking created successfully',
      booking,
    });
  } catch (err) {
    console.error('❌ Booking creation error:', err);
    res.status(500).json({ msg: 'Failed to create booking' });
  }
};

// @desc   Get current user's bookings
// @route  GET /api/bookings
// @access Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Booking fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};
