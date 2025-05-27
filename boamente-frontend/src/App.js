import React from 'react';
import './style.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer, toast} from 'react-toastify';

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}
