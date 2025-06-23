import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';
import AuthSidebar from './AuthSidebar';

const indianCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai",
  "Kolkata", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan",
  "Vasai", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior"
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedCity, setSelectedCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
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

  const filteredCities = indianCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <nav className="bg-blue-50 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <button onClick={handleLogoClick} className="focus:outline-none cursor-pointer">
        <img src={logo} alt="HandyConnect Logo" className="h-10 w-auto" />
      </button>

      {/* Navigation Links */}
      <div className="space-x-6 hidden sm:flex">
        <button
          onClick={() => navigate('/about')}
          className="text-blue-900 hover:text-blue-600 font-semibold transition duration-200"
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection('services')}
          className="text-blue-900 hover:text-blue-600 font-semibold transition duration-200"
        >
          Avail a Service
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="text-blue-900 hover:text-blue-600 font-semibold transition duration-200"
        >
          Contact Us
        </button>
      </div>

      {/* Right Section: City Selector + User */}
      <div className="relative flex items-center gap-4">
        {/* City Selector */}
        <div className="relative">
          <div
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center border border-blue-200 rounded px-3 py-1 cursor-pointer text-sm hover:border-blue-500 bg-white"
          >
            <MapPin size={16} className="mr-1 text-blue-600" />
            {selectedCity || "Select City"}
          </div>

          {cityDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow z-50">
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search city..."
                className="w-full px-3 py-2 border-b text-sm focus:outline-none"
              />
              <div className="max-h-60 overflow-y-auto">
                {filteredCities.map((city, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityDropdownOpen(false);
                      setCitySearch('');
                    }}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  >
                    {city}
                  </div>
                ))}
                {filteredCities.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">No results</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Auth */}
        {!user ? (
          <UserCircle
            onClick={() => {
              setShowSidebar(true);
              setAuthMode('login');
            }}
            className="text-blue-600 w-8 h-8 cursor-pointer hover:text-blue-800"
          />
        ) : (
          <div className="relative flex items-center gap-2 cursor-pointer">
            <span className="text-blue-700 font-medium">Hi, {user.name?.split(' ')[0]}</span>
            <UserCircle
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-blue-600 w-8 h-8 hover:text-blue-800"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-10 bg-white border rounded shadow w-32 z-50">
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

      {/* Auth Sidebar */}
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