import { createContext, useContext, useState } from 'react';

const WorkerAuthContext = createContext();

export const WorkerAuthProvider = ({ children }) => {
  const [worker, setWorker] = useState(() => {
    try {
      const stored = localStorage.getItem('worker');
      if (!stored || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse worker from localStorage:", e);
      return null;
    }
  });

  const loginWorker = (workerData) => {
    setWorker(workerData);
    localStorage.setItem('worker', JSON.stringify(workerData));
  };

  const logoutWorker = () => {
    setWorker(null);
    localStorage.removeItem('worker');
  };

  return (
    <WorkerAuthContext.Provider value={{ worker, loginWorker, logoutWorker }}>
      {children}
    </WorkerAuthContext.Provider>
  );
};

export const useWorkerAuth = () => useContext(WorkerAuthContext);
