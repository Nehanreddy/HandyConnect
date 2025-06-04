import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const AuthSidebar = ({ mode, onClose, switchMode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signupForm, setSignupForm] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });

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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', signupForm);
      alert('Signup successful! Please login.');
      switchMode('login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-auto">
      <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>✕</button>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold text-blue-600">Login</h2>
          <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <a href="#" className="text-sm text-blue-500 hover:underline block text-right">Forgot password?</a>
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
          <p className="text-sm mt-4 text-center">
            Don't have an account? <button type="button" onClick={() => switchMode('signup')} className="text-blue-600 underline">Sign up</button>
          </p>
          <button type="button" className="text-blue-700 border mt-4 w-full py-2 rounded hover:bg-blue-50">Work with us?</button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold text-blue-600">Sign Up</h2>
          <input name="name" placeholder="Name" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} className="w-full border p-2 rounded" required />
          <input name="email" placeholder="Email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="w-full border p-2 rounded" required />
          <input name="password" placeholder="Password" type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className="w-full border p-2 rounded" required />
          <input name="confirmPassword" placeholder="Confirm Password" type="password" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} className="w-full border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Sign Up</button>
          <p className="text-sm mt-4 text-center">
            Already have an account? <button type="button" onClick={() => switchMode('login')} className="text-blue-600 underline">Login</button>
          </p>
          <button type="button" className="text-blue-700 border mt-4 w-full py-2 rounded hover:bg-blue-50">Work with us?</button>
        </form>
      )}
    </div>
  );
};

export default AuthSidebar;
