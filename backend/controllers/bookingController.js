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
      user: req.user.id,
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
      .populate('acceptedBy', 'name phone email city serviceType')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Booking fetch error:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};

exports.getBookingsByCityAndService = async (req, res) => {
  const { city, serviceType } = req.query;

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

    booking.status = status;
    
    if (status === 'accepted') {
      booking.acceptedBy = req.worker.id;
      booking.acceptedAt = new Date();
    }

    await booking.save();
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

// 🆕 NEW: Mark booking as completed (Worker function)
exports.markBookingCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Check if the worker who accepted this booking is trying to complete it
    if (booking.acceptedBy.toString() !== req.worker.id.toString()) {
      return res.status(403).json({ msg: 'You can only complete bookings you accepted' });
    }

    if (booking.status !== 'accepted') {
      return res.status(400).json({ msg: 'Only accepted bookings can be marked as completed' });
    }

    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save();

    res.status(200).json({ 
      msg: 'Booking marked as completed', 
      booking 
    });
  } catch (err) {
    console.error('❌ Error marking booking complete:', err);
    res.status(500).json({ msg: 'Failed to mark booking as completed' });
  }
};

// 🆕 NEW: Submit rating and review (User function)
exports.rateBooking = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ msg: 'You can only rate your own bookings' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ msg: 'Only completed bookings can be rated' });
    }

    booking.rating = rating;
    booking.review = review || '';
    booking.ratedAt = new Date();
    booking.status = 'rated';
    await booking.save();

    res.status(200).json({ 
      msg: 'Rating submitted successfully', 
      booking 
    });
  } catch (err) {
    console.error('❌ Error submitting rating:', err);
    res.status(500).json({ msg: 'Failed to submit rating' });
  }
};

// 🆕 NEW: Get worker's completed bookings with ratings (Worker Dashboard)
exports.getWorkerCompletedJobs = async (req, res) => {
  try {
    const completedJobs = await Booking.find({
      acceptedBy: req.worker.id,
      status: { $in: ['completed', 'rated'] }
    })
    .populate('user', 'name email')
    .sort({ completedAt: -1 });

    // Calculate worker statistics
    const totalJobs = completedJobs.length;
    const ratedJobs = completedJobs.filter(job => job.rating);
    const totalRatings = ratedJobs.length;
    const averageRating = totalRatings > 0 
      ? (ratedJobs.reduce((sum, job) => sum + job.rating, 0) / totalRatings).toFixed(1)
      : 0;

    const stats = {
      totalCompletedJobs: totalJobs,
      totalRatings,
      averageRating: parseFloat(averageRating),
      ratingBreakdown: {
        5: ratedJobs.filter(job => job.rating === 5).length,
        4: ratedJobs.filter(job => job.rating === 4).length,
        3: ratedJobs.filter(job => job.rating === 3).length,
        2: ratedJobs.filter(job => job.rating === 2).length,
        1: ratedJobs.filter(job => job.rating === 1).length,
      }
    };

    res.status(200).json({
      jobs: completedJobs,
      stats
    });
  } catch (err) {
    console.error('❌ Error fetching completed jobs:', err);
    res.status(500).json({ msg: 'Failed to fetch completed jobs' });
  }
};

// 🔄 UPDATED: Enhanced getUserBookingsWithWorkers to include completed/rated
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
      completed: bookings.filter(b => b.status === 'completed'),
      rated: bookings.filter(b => b.status === 'rated') // 🆕 Added rated category
    };

    res.status(200).json(categorizedBookings);
  } catch (err) {
    console.error('❌ Error fetching user bookings:', err);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
};
