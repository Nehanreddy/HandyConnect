import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

import Signup from '../services/Signup';
import Profile from '../pages/Profile';
import ResetPassword from "../pages/ResetPassword";

import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/:username" element={<Home />} />
     
      <Route path="/signup" element={user ? <Navigate to={`/home/${user.name}`} /> : <Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
