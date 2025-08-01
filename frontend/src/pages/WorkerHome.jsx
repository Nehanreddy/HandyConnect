import React, { useEffect, useState } from 'react';
import WorkerNavbar from '../components/Workernavbar';
import { useWorkerAuth } from '../context/WorkerAuthContext';

const WorkerHome = () => {
  const { worker } = useWorkerAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!worker?.city || !worker?.serviceType) return;

    setLoading(true);
    try {
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

  //... handleAction and handleMarkComplete methods remain the same

  useEffect(() => {
    fetchRequests();
  }, [worker]);

  return (
    <div>
      <WorkerNavbar />
      <div className="max-w-5xl mx-auto p-6 pt-24">
        {worker ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center">
              {worker.serviceType} Requests in {worker.city || 'your city'}
            </h1>
            {/* Display worker info */}
            <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">
                Showing <strong>{worker.serviceType}</strong> requests for <strong>{worker.city}</strong>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Logged in as: <strong>{worker.name}</strong>
              </p>
            </div>

            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : requests.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>No {worker.serviceType} requests in {worker.city} right now.</p>
                <p className="text-sm mt-2">Check back later for new service requests!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="p-6 bg-white rounded-xl shadow-md border border-gray-200"
                  >
                    {/* ... the rest of request rendering remains unchanged */}
                    {/* Your existing JSX for each request goes here */}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Context shown if worker is not logged in
          <div className="max-w-xl mx-auto text-center p-8 bg-gray-50 rounded-lg shadow-md mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome to Handy Connect for Workers
            </h2>
            <p className="text-gray-700 mb-4">
              This platform connects you with customers seeking trusted home service professionals in your area.
            </p>
            <p className="text-gray-700 mb-4">
              Once you login or register as a worker, you’ll be able to:
            </p>
            <ul className="text-left list-disc list-inside text-gray-600 mb-6">
              <li>View new service requests in your city that match your expertise</li>
              <li>Accept or reject booking requests based on your availability</li>
              <li>Mark jobs as completed and provide excellent service</li>
              <li>Build your reputation through customer ratings and reviews</li>
              <li>Manage your profile and track your bookings all in one place</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Please <a href="/worker-login" className="text-indigo-600 underline">log in</a> or <a href="/worker-register" className="text-indigo-600 underline">create an account</a> to get started.
            </p>
            <p className="text-sm text-gray-500">
              We’re excited to help you grow your business and connect with customers nearby!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;
