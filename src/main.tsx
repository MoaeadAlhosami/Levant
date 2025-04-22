import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import './i18n';
import './styles/index.css';
import Header from './components/UI/Header';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <AppRoutes />
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  </React.StrictMode>
);