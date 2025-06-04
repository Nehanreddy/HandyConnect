import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import logo from '../assets/logo.png';
import AuthSidebar from './AuthSidebar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleLogoClick = () => window.location.reload();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <button onClick={handleLogoClick} className="focus:outline-none">
        <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
      </button>

      {!user ? (
        <div className="space-x-4">
          <button onClick={() => { setShowSidebar(true); setAuthMode('login'); }} className="text-blue-600 hover:underline">Login/SignUp</button>
        </div>
      ) : (
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-blue-600 font-medium">
            Hi, {user.name}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-32">
              <button onClick={() => window.location.href = `/profile`} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      )}

      {showSidebar && (
        <AuthSidebar mode={authMode} onClose={() => setShowSidebar(false)} switchMode={setAuthMode} />
      )}
    </nav>
  );
};

export default Navbar;
