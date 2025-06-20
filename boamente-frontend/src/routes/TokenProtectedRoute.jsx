import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { validateTokenBackend } from '../services/authService';

export default function TokenProtectedRoute({ children }) {
  const location = useLocation();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    async function checkToken() {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if (!token) {
        setIsValid(false);
        return;
      }

      const validBackend = await validateTokenBackend(token);
      setIsValid(validBackend);
    }

    checkToken();
  }, [location.search]);

  return isValid ? children : <Navigate to="/" />;
}
