import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Navbar from '../components/Navbar';
import RatingModal from '../components/RatingModal'; // 🆕 Import the RatingModal
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  StarIcon // 🆕 Add StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'; // 🆕 Add solid star

const MyServices = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState({
    pending: [],
    accepted: [],
    rejected: [],
    completed: [],
    rated: [] // 🆕 Add rated category
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showRatingModal, setShowRatingModal] = useState(false); // 🆕 Rating modal state
  const [selectedBooking, setSelectedBooking] = useState(null); // 🆕 Selected booking for rating

  useEffect(() => {
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    if (!user?.token) return;

    setLoading(true);
    try {
      const response = await API.get('/bookings/my-services', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Handle rating submission
  const handleRatingSubmit = async (bookingId, rating, review) => {
    try {
      const response = await API.put(`/bookings/${bookingId}/rate`, {
        rating,
        review
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      // Refresh the services after rating
      await fetchMyServices();
      
      alert('✅ Thank you for your rating!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('❌ Failed to submit rating. Please try again.');
    }
  };

  // 🆕 Open rating modal
  const openRatingModal = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  // 🆕 Close rating modal
  const closeRatingModal = () => {
    setShowRatingModal(false);
    setSelectedBooking(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
      case 'rated': // 🆕 Add rated status
        return <StarIconSolid className="w-5 h-5 text-purple-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rated': // 🆕 Add rated status color
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAllBookings = () => {
    return [
      ...bookings.pending,
      ...bookings.accepted,
      ...bookings.rejected,
      ...bookings.completed,
      ...bookings.rated // 🆕 Include rated bookings
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getFilteredBookings = () => {
    if (activeTab === 'all') return getAllBookings();
    return bookings[activeTab] || [];
  };

  // 🆕 Render stars for rated services
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <StarIconSolid key={star} className="w-4 h-4 text-yellow-400" />
          ) : (
            <StarIcon key={star} className="w-4 h-4 text-gray-300" />
          )
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  const renderWorkerDetails = (booking) => {
    if ((booking.status === 'accepted' || booking.status === 'completed' || booking.status === 'rated') && booking.acceptedBy) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            Worker Details
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {booking.acceptedBy.name}</p>
            <p className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-1" />
              <strong>Phone:</strong> 
              <a href={`tel:${booking.acceptedBy.phone}`} className="ml-1 text-blue-600 hover:underline">
                {booking.acceptedBy.phone}
              </a>
            </p>
            <p><strong>Service Type:</strong> {booking.acceptedBy.serviceType}</p>
            <p><strong>City:</strong> {booking.acceptedBy.city}</p>
            <p className="text-xs text-green-600">
              <strong>Accepted:</strong> {new Date(booking.acceptedAt).toLocaleString()}
            </p>
            {booking.completedAt && (
              <p className="text-xs text-blue-600">
                <strong>Completed:</strong> {new Date(booking.completedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // 🆕 Render rating section for completed/rated services
  const renderRatingSection = (booking) => {
    if (booking.status === 'completed') {
      return (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Service Completed!</h4>
              <p className="text-sm text-blue-700">How was your experience? Rate this service.</p>
            </div>
            <button
              onClick={() => openRatingModal(booking)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ⭐ Rate Service
            </button>
          </div>
        </div>
      );
    }

    if (booking.status === 'rated' && booking.rating) {
      return (
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Your Rating</h4>
          <div className="space-y-2">
            {renderStars(booking.rating)}
            {booking.review && (
              <div>
                <p className="text-sm text-purple-700 font-medium">Your Review:</p>
                <p className="text-sm text-purple-600 italic">"{booking.review}"</p>
              </div>
            )}
            <p className="text-xs text-purple-500">
              Rated on {new Date(booking.ratedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Services</h1>

          {/* Status Summary Cards - 🔄 Updated to include rated */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
              <div className="flex items-center">
                <ClockIcon className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.pending.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.accepted.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
              <div className="flex items-center">
                <XCircleIcon className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.rejected.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.completed.length}</p>
                </div>
              </div>
            </div>
            {/* 🆕 NEW: Rated card */}
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
              <div className="flex items-center">
                <StarIconSolid className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Rated</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.rated.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs - 🔄 Updated to include rated */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['all', 'pending', 'accepted', 'rejected', 'completed', 'rated'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab} ({tab === 'all' ? getAllBookings().length : bookings[tab]?.length || 0})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-6">
            {getFilteredBookings().length === 0 ? (
              <div className="text-center py-12">
                <WrenchScrewdriverIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500">
                  {activeTab === 'all' 
                    ? "You haven't booked any services yet." 
                    : `No ${activeTab} services at the moment.`}
                </p>
              </div>
            ) : (
              getFilteredBookings().map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <WrenchScrewdriverIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{booking.serviceType}</h3>
                        <p className="text-sm text-gray-500">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2"><strong>Problem:</strong></p>
                      <p className="text-gray-800">{booking.problem}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <strong>Location:</strong>
                      </p>
                      <p className="text-gray-800">{booking.serviceLocation.address}, {booking.serviceLocation.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <strong>Scheduled:</strong>
                      </p>
                      <p className="text-gray-800">{booking.date} at {booking.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2"><strong>Urgency:</strong></p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.urgency === 'Emergency' ? 'bg-red-100 text-red-800' :
                        booking.urgency === 'Urgent' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {booking.urgency}
                      </span>
                    </div>
                  </div>

                  {/* Worker Details */}
                  {renderWorkerDetails(booking)}

                  {/* 🆕 NEW: Rating Section */}
                  {renderRatingSection(booking)}

                  {/* Status-specific messages */}
                  {booking.status === 'pending' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        🕐 Waiting for a worker to accept your request. You'll be notified once someone accepts!
                      </p>
                    </div>
                  )}

                  {booking.status === 'rejected' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">
                        ❌ This request was not accepted. You can book again for this service.
                      </p>
                    </div>
                  )}

                  {booking.status === 'accepted' && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        ✅ Worker is on the way! Contact them if needed.
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🆕 NEW: Rating Modal */}
      {showRatingModal && selectedBooking && (
        <RatingModal
          booking={selectedBooking}
          onClose={closeRatingModal}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default MyServices;
