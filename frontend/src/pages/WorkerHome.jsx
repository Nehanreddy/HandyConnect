import React, { useEffect, useState } from 'react';
import WorkerNavbar from '../components/Workernavbar';
import { useWorkerAuth } from '../context/WorkerAuthContext';

const WorkerHome = () => {
  const { worker } = useWorkerAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    // Check if both city and serviceType are available
    if (!worker?.city || !worker?.serviceType || !worker?._id) return;

    setLoading(true);
    try {
      // 🔄 SOLUTION: Fetch BOTH pending requests AND accepted jobs by this worker
      const [pendingRes, acceptedRes] = await Promise.all([
        // Get pending requests in this city/serviceType (available to all workers)
        fetch(`/api/bookings/by-city?city=${encodeURIComponent(worker.city)}&serviceType=${encodeURIComponent(worker.serviceType)}`),
        // Get accepted jobs by this worker (your ongoing work)
        fetch(`/api/bookings/worker-accepted?workerId=${worker._id}`)
      ]);

      let allRequests = [];

      // Handle pending requests
      if (pendingRes.ok) {
        const pendingData = await pendingRes.json();
        allRequests = [...pendingData];
      }

      // Handle accepted requests by this worker  
      if (acceptedRes.ok) {
        const acceptedData = await acceptedRes.json();
        // Add accepted jobs, avoiding duplicates
        const acceptedJobs = acceptedData.filter(job => 
          !allRequests.some(req => req._id === job._id)
        );
        allRequests = [...allRequests, ...acceptedJobs];
      }

      setRequests(allRequests);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (bookingId, action) => {
    // Check if worker has token
    if (!worker?.token) {
      console.error('No worker token found');
      alert('Authentication required. Please login again.');
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${worker.token}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const responseData = await res.json();
      console.log('✅ Booking status updated:', responseData);

      // 🔄 UPDATED: Different handling for accepted vs rejected
      if (action === 'accepted') {
        // Keep accepted jobs in the list with updated status and worker info
        const updatedRequests = requests.map((req) =>
          req._id === bookingId 
            ? { ...req, status: action, acceptedBy: worker._id, acceptedAt: new Date() } 
            : req
        );
        setRequests(updatedRequests);
        alert('✅ Service request accepted! Complete the work and mark it as done.');
      } else if (action === 'rejected') {
        // Remove rejected jobs from the list
        setRequests(prev => prev.filter(req => req._id !== bookingId));
        alert('❌ Service request rejected.');
      }

    } catch (err) {
      console.error('Error updating booking status:', err);
      alert(`Failed to ${action} the request: ${err.message}`);
    }
  };

  // Handle Mark Complete function
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

      // 🔄 UPDATED: Remove completed jobs from worker's view (now user can rate)
      setRequests(prev => prev.filter(req => req._id !== bookingId));
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
            <p className="text-xs text-blue-600 mt-1">
              Logged in as: <strong>{worker.name}</strong> (ID: {worker._id})
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
                className={`p-6 rounded-xl shadow-md border ${
                  req.acceptedBy?.toString() === worker._id 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-blue-700">{req.serviceType}</h2>
                  <div className="flex gap-2">
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
                    {/* Show if this job is accepted by current worker */}
                    {req.acceptedBy?.toString() === worker._id && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        YOUR JOB
                      </span>
                    )}
                  </div>
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

                {/* Enhanced status rendering with proper worker check */}
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
                ) : req.status === 'accepted' && req.acceptedBy?.toString() === worker._id ? (
                  <div className="mt-4">
                    <button
                      onClick={() => handleMarkComplete(req._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-4"
                    >
                      ✅ Mark as Completed
                    </button>
                    <div className="text-sm text-green-600 mt-2 font-medium">
                      ✅ You accepted this request. Complete the work and mark it as done.
                    </div>
                  </div>
                ) : req.status === 'accepted' ? (
                  <div className="mt-4 text-sm font-medium text-orange-600">
                    ⚠️ This request has been accepted by another worker.
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
