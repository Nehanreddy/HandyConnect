import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../services/Signup';
import Profile from '../pages/Profile';
import WorkerProfile from '../pages/WorkerProfile'; // 
import ResetPassword from "../pages/ResetPassword";
import WorkerHome from '../pages/WorkerHome';
import WorkerSignup from '../pages/WorkerSignup';
import ServiceBookingPage from '../pages/servicebookingpage';
import { WorkerAuthProvider, useWorkerAuth } from '../context/WorkerAuthContext';
import { useAuth } from '../context/AuthContext';
import WorkerResetPassword from '../pages/WorkerResetPassword';


const WorkerProtectedRoute = ({ element }) => {
  const { worker } = useWorkerAuth();
  return worker ? element : <Navigate to="/worker" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <WorkerAuthProvider>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home/:username" element={<Home />} />
        <Route path="/signup" element={user ? <Navigate to={`/home/${user.name}`} /> : <Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/worker/profile" element={<WorkerProfile />} />
         <Route path="/services/:serviceName" element={<ServiceBookingPage />} />

        

        {/* Worker routes */}
        <Route path="/worker" element={<WorkerHome />} />
        <Route path="/worker/signup" element={<WorkerSignup />} />
        <Route path="/worker/reset-password" element={<WorkerResetPassword />} />
        <Route path="/worker/home/:name" element={<WorkerProtectedRoute element={<WorkerHome />} />} />
      </Routes>
    </WorkerAuthProvider>
  );
};

export default AppRoutes;
