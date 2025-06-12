import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkerAuth } from '../context/WorkerAuthContext';
import API from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const WorkerSidebar = ({ onClose }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const { loginWorker } = useWorkerAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/worker/login', { email, password });
      console.log(res);  // Log the full response to see what is returned
    loginWorker(res.data); // res.data already includes name, email, token
navigate(`/worker/home/${res.data.name}`);

      onClose();
    } catch (err) {
      console.error(err);  // Log the error
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-auto">
      <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>✕</button>

      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold text-blue-600">Worker Login</h2>

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
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
            Login
          </button>

<button
  type="button"
  onClick={() => {
    onClose();
    navigate('/worker/reset-password'); // changed route
  }}
  className="text-sm text-blue-500 hover:underline block text-right"
>
  Forgot password?
</button>

          <p className="text-sm mt-4 text-center">
            Don’t have an account?{' '}
            <button type="button" onClick={() => { onClose(); navigate('/worker/signup'); }} className="text-blue-600 underline">
              Sign up
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default WorkerSidebar;
