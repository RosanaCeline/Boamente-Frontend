import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { validateAuthTokenBackend } from '../services/authService';

export default function PrivateRoute() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('authToken');
          setIsValid(false);
          return;
        }

        const backendValid = await validateAuthTokenBackend(token);
        setIsValid(backendValid);
      } catch {
        localStorage.removeItem('authToken');
        setIsValid(false);
      }
    }

    checkToken();
  }, []);

  if (isValid === null) return <div>Carregando...</div>;
  return isValid ? <Outlet /> : <Navigate to="/login" />;
}