import { createContext, useContext, useState, useEffect } from 'react';

const WorkerAuthContext = createContext();

export const WorkerAuthProvider = ({ children }) => {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('worker');
      if (stored && stored !== 'undefined') {
        setWorker(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading worker from localStorage:", e);
    }
  }, []);

 const loginWorker = (workerData) => {
  if (workerData?.token) {
    localStorage.setItem('worker', JSON.stringify(workerData));
    setWorker(workerData);
  } else {
    console.warn("⚠️ Tried to login but no token was provided.");
  }
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
