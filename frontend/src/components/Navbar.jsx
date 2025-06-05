import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import AuthSidebar from './AuthSidebar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <button onClick={handleLogoClick} className="focus:outline-none cursor-pointer">
        <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
      </button>

      <div className="space-x-6 text-center">
        <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 font-medium">About Us</button>
        <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 font-medium">Avail a Service</button>
        <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium">Contact Us</button>
      </div>

      {!user ? (
        <button onClick={() => { setShowSidebar(true); setAuthMode('login'); }} className="text-blue-600 hover:underline">
          Login/SignUp
        </button>
      ) : (
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-blue-600 font-medium">
            Hi, {user.name}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-32">
              <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      )}

      {showSidebar && (
        <AuthSidebar
          mode={authMode}
          onClose={() => setShowSidebar(false)}
          switchMode={setAuthMode}
        />
      )}
    </nav>
  );
};

export default Navbar;
