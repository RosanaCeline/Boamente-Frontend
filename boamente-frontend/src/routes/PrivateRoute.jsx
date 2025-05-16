import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = false; 

export default function PrivateRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
