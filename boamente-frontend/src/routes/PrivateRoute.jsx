import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return isAuthenticated ? children : <Navigate to="/login" />;
}

