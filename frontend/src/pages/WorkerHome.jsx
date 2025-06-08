import WorkerNavbar from '../components/WorkerNavbar';
import { useWorkerAuth } from '../context/WorkerAuthContext';

const WorkerHome = () => {
  const { worker } = useWorkerAuth();

  return (
    <div>
      <WorkerNavbar />
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold">Welcome, {worker?.name}</h1>
        <p className="mt-2 text-gray-600">This is your worker dashboard</p>
      </div>
    </div>
  );
};

export default WorkerHome;
