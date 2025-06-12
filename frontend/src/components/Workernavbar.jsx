import { useNavigate } from 'react-router-dom';
import { useWorkerAuth } from '../context/WorkerAuthContext';
import { useState } from 'react';
import logo from '../assets/logo.png';
import WorkerSidebar from './WorkerSidebar';

const WorkerNavbar = () => {
  const { worker, logoutWorker } = useWorkerAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logoutWorker();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/worker/profile');
    setDropdownOpen(false); // Close dropdown after navigation
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <button onClick={() => navigate('/')} className="focus:outline-none cursor-pointer">
        <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
      </button>

      {!worker ? (
        <button onClick={() => setShowSidebar(true)} className="text-blue-600 hover:underline">
          Login / SignUp
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-blue-600 font-medium"
          >
            Hi, {worker.name}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-36">
              <button
                onClick={handleProfile}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {showSidebar && <WorkerSidebar onClose={() => setShowSidebar(false)} />}
    </nav>
  );
};

export default WorkerNavbar;
