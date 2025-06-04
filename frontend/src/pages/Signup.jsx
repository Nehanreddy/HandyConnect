import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', confirmPassword: '',
    address: '', city: '', state: '', pincode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      alert("Signup successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="col-span-2 border p-2 rounded" required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="col-span-2 border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="col-span-2 border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 rounded" required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="border p-2 rounded" required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="col-span-2 border p-2 rounded" />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded" />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-2 rounded" />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="col-span-2 border p-2 rounded" />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
