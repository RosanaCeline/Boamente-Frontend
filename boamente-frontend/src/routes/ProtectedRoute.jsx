import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { validateInstallationTokenBackend } from '../services/authService';

export default function ProtectedRoute() {
  const location = useLocation();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    async function checkToken() {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("authToken");
          setIsValid(false);
          return;
        }

        const response = await validateInstallationTokenBackend(token);

        if (response.valid) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("patientUuid", response.uuid);
          localStorage.setItem("patientName", response.name);
          setIsValid(true);
        } else {
          console.warn("Token inválido:", response.message);
          setIsValid(false);
        }
      } catch (err) {
        console.error("Erro ao validar token:", err);
        setIsValid(false);
      }
    }

    checkToken();
  }, [location.search]);

  if (isValid === null) return <div>Carregando...</div>;
  return isValid ? <Outlet /> : <Navigate to="/" />;
}