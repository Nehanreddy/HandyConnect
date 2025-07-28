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
    try {
      // Make API call to update booking status
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      // Update local state only if API call succeeds
      const updatedRequests = requests.map((req) =>
        req._id === bookingId ? { ...req, status: action } : req
      );
      setRequests(updatedRequests);
    } catch (err) {
      console.error('Error updating booking status:', err);
      // Optionally show error message to user
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
                ) : (
                  <div className="mt-4 text-sm font-medium text-gray-700">
                    Status:{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        req.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {req.status}
                    </span>
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
