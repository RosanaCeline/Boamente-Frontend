import React, { useState } from 'react';
import '../../../style.css';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import HeaderInternal from '../Header/private/HeaderInternal';
import { jwtDecode } from 'jwt-decode';

export default function PrivateLayout({ routes }) {
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth * 0.04);

  const currentRoute = routes.find(route => route.path === location.pathname);
  const pageTitle = currentRoute ? currentRoute.title : '';

  const token = localStorage.getItem('authToken');
  let firstName = 'Usuário';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.name) {
        firstName = decoded.name.split(' ')[0];  // Pega só o primeiro nome
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }

  return (
    <>
      <Sidebar onWidthChange={setSidebarWidth} userName={firstName} />
      <HeaderInternal pageTitle={pageTitle} sidebarWidth={sidebarWidth} />
      <main style={{ marginLeft: sidebarWidth, transition: "margin-left 0.4s ease-in-out" }}>
        <Outlet />
      </main>
    </>
  );
}
