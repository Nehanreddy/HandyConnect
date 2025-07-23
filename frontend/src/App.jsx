import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import WorkerNavbar from './components/Workernavbar';
import { useEffect, useState } from 'react';

// Wrapper to use hooks outside <Router>
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const location = useLocation();
  const [isWorkerRoute, setIsWorkerRoute] = useState(false);

  useEffect(() => {
    setIsWorkerRoute(location.pathname.startsWith('/worker'));
  }, [location]);

  return (
    <>
      {isWorkerRoute ? <WorkerNavbar /> : <Navbar />}
      <AppRoutes />
    </>
  );
};

export default AppWrapper;
