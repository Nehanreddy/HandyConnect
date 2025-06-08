import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Eye, EyeOff } from 'lucide-react'; // 👁️ icons

const AuthSidebar = ({ mode, onClose, switchMode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user);
      navigate(`/home/${res.data.user.name}`);
      onClose();
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const redirectToSignupPage = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-auto">
      <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>✕</button>

      <form onSubmit={handleLogin} className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold text-blue-600">Login</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            className="w-full border p-2 rounded pr-10"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

       <button
  type="button"
  onClick={() => {
    onClose();
    navigate('/reset-password');
  }}
  className="text-sm text-blue-500 hover:underline block text-right"
>
  Forgot password?
</button>


        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <button type="button" onClick={redirectToSignupPage} className="text-blue-600 underline">
            Sign up
          </button>
        </p>
        <p className="text-sm mt-4 text-center">or </p>

        <button
  type="button"
  onClick={() => {
    onClose();
    navigate('/worker'); // Navigate to worker section
  }}
  className="text-blue-700 border mt-4 w-full py-2 rounded hover:bg-blue-50"
>
  Work with us?
</button>

      </form>
    </div>
  );
};

export default AuthSidebar;
