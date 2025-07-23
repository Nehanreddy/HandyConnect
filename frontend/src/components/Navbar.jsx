import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 text-white">
      {/* Logo */}
      <button onClick={handleLogoClick} className="focus:outline-none cursor-pointer">
        <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
      </button>

      {/* Navigation Links */}
      <div className="space-x-6 hidden sm:flex">
        <button
          onClick={() => navigate('/about')}
          className="text-gray-200 hover:text-indigo-400 font-semibold transition duration-200"
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection('services')}
          className="text-gray-200 hover:text-indigo-400 font-semibold transition duration-200"
        >
          Avail a Service
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="text-gray-200 hover:text-indigo-400 font-semibold transition duration-200"
        >
          Contact Us
        </button>
      </div>

      {/* Right Section: User Auth */}
      <div className="relative flex items-center gap-4">
        {!user ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
          >
            Get Started
          </button>
        ) : (
          <div className="relative flex items-center gap-2 cursor-pointer">
            <span className="text-indigo-300 font-medium">Hi, {user.name?.split(' ')[0]}</span>
            <UserCircle
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-indigo-400 w-8 h-8 hover:text-indigo-300"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-10 bg-white text-gray-800 border rounded shadow w-32 z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
