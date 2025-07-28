const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

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


exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('acceptedBy', 'name phone email city serviceType') // 🆕 Populate worker details
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Booking fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};


exports.getBookingsByCityAndService = async (req, res) => {
  const { city, serviceType } = req.query;

  // Build filter object dynamically
  const filter = {
    status: 'pending',
  };

  if (city) {
    filter['serviceLocation.city'] = { $regex: new RegExp(`^${city.trim()}$`, 'i') };
  }

  if (serviceType) {
    filter.serviceType = { $regex: new RegExp(`^${serviceType.trim()}$`, 'i') };
  }

  if (!city || !serviceType) {
    return res.status(400).json({ msg: 'Both city and service type are required' });
  }

  try {
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Error fetching filtered bookings:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};



// @desc   Update booking status
// @route  PUT /api/bookings/:id/status
// @access Worker Authenticated
exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // 🆕 UPDATE: Store worker details when accepting
    booking.status = status;
    
    if (status === 'accepted') {
      booking.acceptedBy = req.worker.id; // 🆕 Store worker ID
      booking.acceptedAt = new Date(); // 🆕 Store acceptance time
    }

    await booking.save();

    // 🆕 POPULATE worker details in response
    await booking.populate('acceptedBy', 'name phone email city serviceType');

    res.status(200).json({ 
      msg: `Booking ${status}`, 
      booking 
    });
  } catch (err) {
    console.error('❌ Error updating status:', err);
    res.status(500).json({ msg: 'Failed to update status' });
  }
};

exports.getUserBookingsWithWorkers = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('acceptedBy', 'name phone email city serviceType profilePhoto')
      .sort({ createdAt: -1 });

    // Categorize bookings
    const categorizedBookings = {
      pending: bookings.filter(b => b.status === 'pending'),
      accepted: bookings.filter(b => b.status === 'accepted'),
      rejected: bookings.filter(b => b.status === 'rejected'),
      completed: bookings.filter(b => b.status === 'completed')
    };

    res.status(200).json(categorizedBookings);
  } catch (err) {
    console.error('❌ Error fetching user bookings:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};
