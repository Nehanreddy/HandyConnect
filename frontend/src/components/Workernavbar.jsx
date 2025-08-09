import { useNavigate } from 'react-router-dom';
import { useWorkerAuth } from '../context/WorkerAuthContext';
import { useState } from 'react';
import logo from '../assets/logo.png';
import WorkerSidebar from './WorkerSidebar';
import AdminLoginModal from './AdminLoginModal'; // 🆕 NEW

const WorkerNavbar = () => {
  const { worker, logoutWorker } = useWorkerAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false); // 🆕 NEW

  const handleLogout = () => {
    logoutWorker();
    navigate('/worker');
    window.location.reload(); 
  };

  const handleProfile = () => {
    navigate('/worker/profile');
    setDropdownOpen(false);
  };

  const handleDashboard = () => {
    navigate('/worker/dashboard');
    setDropdownOpen(false);
  };

  // 🆕 NEW: Handle Admin Login
  const handleAdminLogin = () => {
    setShowAdminLogin(true);
  };

  // 🔄 UPDATED: Handle logo click to redirect to main home page
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <button 
          onClick={handleLogoClick} 
          className="focus:outline-none cursor-pointer transform hover:scale-105 transition-transform duration-200"
        >
          <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
        </button>

        {/* Navigation Links (when worker is logged in) */}
        {worker && (
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => navigate('/worker')}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Service Requests
            </button>
            <button
              onClick={handleDashboard}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </button>
          </div>
        )}

        {/* Right Side - User Actions */}
        <div className="flex items-center space-x-4">
          {/* 🆕 NEW: Admin Button */}
          <button
            onClick={handleAdminLogin}
            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition font-medium"
          >
            🔐 Admin
          </button>

          {!worker ? (
            <button onClick={() => setShowSidebar(true)} className="text-blue-600 hover:underline">
              Login / SignUp
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-blue-600 font-medium flex items-center space-x-2"
              >
                <span>Hi, {worker.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 z-50">
                  <button
                    onClick={handleDashboard}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    👤 Profile
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {showSidebar && <WorkerSidebar onClose={() => setShowSidebar(false)} />}
      </nav>

      {/* 🆕 NEW: Admin Login Modal */}
      <AdminLoginModal 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
      />
    </>
  );
};

export default WorkerNavbar;
