import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { matchRoutes } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import HeaderInternal from '../Header/private/HeaderInternal';
import { jwtDecode } from 'jwt-decode';

export default function PrivateLayout({ routes }) {
  const location = useLocation();
  
  const safeRoutes = Array.isArray(routes) ? routes : [];

  const matchedRoutes = matchRoutes(safeRoutes, location);
  
  let currentRoute = null;
  if (matchedRoutes) {
    for (let i = matchedRoutes.length - 1; i >= 0; i--) {
      if (matchedRoutes[i].route.title) {
        currentRoute = matchedRoutes[i].route;
        break;
      }
    }
  }

  const pageTitle = currentRoute?.title || 'Boamente';

  const token = localStorage.getItem('authToken');
  let firstName = 'Usuário';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.name) {
        firstName = decoded.name.split(' ')[0];
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }

  return (
    <>
      <Sidebar userName={firstName} />
      <HeaderInternal pageTitle={pageTitle} />
      <main style={{ paddingLeft: 72 }}>
        <Outlet />
      </main>
    </>
  );
}