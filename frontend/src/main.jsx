import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { WorkerAuthProvider } from './context/WorkerAuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
         <WorkerAuthProvider>
      <App />
    </WorkerAuthProvider>
    </AuthProvider>

  </React.StrictMode>
);
