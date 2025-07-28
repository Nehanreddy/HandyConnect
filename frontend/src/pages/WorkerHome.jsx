import React, { useEffect, useState } from 'react';
import WorkerNavbar from '../components/Workernavbar';
import { useWorkerAuth } from '../context/WorkerAuthContext';

const WorkerHome = () => {
  const { worker } = useWorkerAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    // Check if both city and serviceType are available
    if (!worker?.city || !worker?.serviceType) return;

    setLoading(true);
    try {
      // Updated API call with both city and serviceType parameters
      const res = await fetch(
        `/api/bookings/by-city?city=${encodeURIComponent(worker.city)}&serviceType=${encodeURIComponent(worker.serviceType)}`
      );

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setRequests([]); // fallback empty
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (bookingId, action) => {
    // 🆕 CHECK: Make sure worker has token
    if (!worker?.token) {
      console.error('No worker token found');
      alert('Authentication required. Please login again.');
      return;
    }

    try {
      // 🔄 UPDATED: Add Authorization header for worker authentication
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${worker.token}`, // 🆕 ADD: Worker token
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const responseData = await res.json();
      console.log('✅ Booking status updated:', responseData);

      // 🔄 UPDATED: Update local state and show success message
      const updatedRequests = requests.map((req) =>
        req._id === bookingId ? { ...req, status: action } : req
      );
      setRequests(updatedRequests);

      // 🆕 ADD: Success feedback
      if (action === 'accepted') {
        alert('✅ Service request accepted! The user will be notified.');
      } else {
        alert('❌ Service request rejected.');
      }

    } catch (err) {
      console.error('Error updating booking status:', err);
      alert(`Failed to ${action} the request: ${err.message}`);
    }
  };

  // 🆕 NEW: Handle Mark Complete function
  const handleMarkComplete = async (bookingId) => {
    if (!worker?.token) {
      alert('Authentication required. Please login again.');
      return;
    }

    if (!confirm('Are you sure you want to mark this job as completed?')) {
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${bookingId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${worker.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Failed to mark as completed');
      }

      // Update local state
      const updatedRequests = requests.map((req) =>
        req._id === bookingId ? { ...req, status: 'completed' } : req
      );
      setRequests(updatedRequests);

      alert('✅ Job marked as completed! The user can now rate your service.');
    } catch (err) {
      console.error('Error marking job complete:', err);
      alert(`Failed to mark job as completed: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [worker]);

  return (
    <div>
      <WorkerNavbar />
      <div className="max-w-5xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {worker?.serviceType} Requests in {worker?.city || 'your city'}
        </h1>
        
        {/* Display worker info */}
        {worker && (
          <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700">
              Showing <strong>{worker.serviceType}</strong> requests for <strong>{worker.city}</strong>
            </p>
            {/* 🆕 ADD: Worker authentication status */}
            <p className="text-xs text-blue-600 mt-1">
              Logged in as: <strong>{worker.name}</strong>
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No {worker?.serviceType} requests in {worker?.city} right now.</p>
            <p className="text-sm mt-2">Check back later for new service requests!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-blue-700">{req.serviceType}</h2>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      req.urgency === 'Emergency'
                        ? 'bg-red-100 text-red-700'
                        : req.urgency === 'Urgent'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {req.urgency}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Problem:</strong> {req.problem}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {req.serviceLocation?.address},{' '}
                  {req.serviceLocation?.city}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Date & Time:</strong> {req.date} at {req.time}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Contact:</strong> {req.contactName} ({req.contactPhone})
                </p>

                {/* 🔄 UPDATED: Enhanced status rendering with Mark Complete functionality */}
                {req.status === 'pending' ? (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleAction(req._id, 'accepted')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                ) : req.status === 'accepted' ? (
                  // 🆕 NEW: Mark Complete button for accepted jobs
                  <div className="mt-4">
                    <button
                      onClick={() => handleMarkComplete(req._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-4"
                    >
                      ✅ Mark as Completed
                    </button>
                    <div className="text-sm text-green-600 mt-2">
                      ✅ You accepted this request. Complete the work and mark it as done.
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-sm font-medium text-gray-700">
                    Status:{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        req.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : req.status === 'rated'
                          ? 'bg-purple-100 text-purple-700'
                          : req.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {req.status}
                    </span>
                    {req.status === 'completed' && (
                      <p className="text-xs text-blue-600 mt-1">
                        ✅ Work completed! Waiting for user rating.
                      </p>
                    )}
                    {req.status === 'rated' && (
                      <p className="text-xs text-purple-600 mt-1">
                        ⭐ User has rated your service! Check your dashboard.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;
