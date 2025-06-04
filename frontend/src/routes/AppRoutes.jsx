import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/:username" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={`/home/${user.name}`} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={`/home/${user.name}`} /> : <Signup />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
