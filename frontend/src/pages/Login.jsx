import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);

      login({
        ...res.data.user,
        token: res.data.token,
      });

      navigate(`/home/${res.data.user.name}`);
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            onClick={() => navigate('/reset-password')}
            className="text-sm text-blue-500 hover:underline block text-right"
          >
            Forgot password?
          </button>

          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
            Login
          </button>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-blue-600 underline"
            >
              Sign up
            </button>
          </p>

          <p className="text-sm mt-4 text-center">or</p>

          <button
            type="button"
            onClick={() => navigate('/worker')}
            className="text-blue-700 border mt-4 w-full py-2 rounded hover:bg-blue-50"
          >
            Work with us?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
