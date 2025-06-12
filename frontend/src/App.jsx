import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import WorkerNavbar from './components/Workernavbar';
const AppContent = () => {
  const location = useLocation();
  const isWorkerRoute = location.pathname.startsWith('/worker'); // 👈 key check

  return (
    <>
      {isWorkerRoute ? <WorkerNavbar /> : <Navbar />}
      <AppRoutes />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
