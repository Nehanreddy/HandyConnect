import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Navbar from '../components/Navbar';
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const MyServices = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState({
    pending: [],
    accepted: [],
    rejected: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAllBookings = () => {
    return [
      ...bookings.pending,
      ...bookings.accepted,
      ...bookings.rejected,
      ...bookings.completed
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getFilteredBookings = () => {
    if (activeTab === 'all') return getAllBookings();
    return bookings[activeTab] || [];
  };

  const renderWorkerDetails = (booking) => {
    if (booking.status === 'accepted' && booking.acceptedBy) {
      return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            Worker Assigned
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

          {/* Status Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['all', 'pending', 'accepted', 'rejected', 'completed'].map((tab) => (
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

                  {/* Worker Details (shown when accepted) */}
                  {renderWorkerDetails(booking)}

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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
