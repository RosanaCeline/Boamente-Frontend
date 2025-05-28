import React, { useState} from 'react';
import '../../../style.css'
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import HeaderInternal from '../Header/private/HeaderInternal';

export default function PrivateLayout({ routes }) {
  const location = useLocation();

  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth * 0.04);

  const currentRoute = routes.find(route => route.path === location.pathname);
  const pageTitle = currentRoute ? currentRoute.title : '';

  return (
    <>
      <Sidebar onWidthChange={setSidebarWidth}/>
      <HeaderInternal pageTitle={pageTitle} sidebarWidth={sidebarWidth} />
      <main style={{ marginLeft: sidebarWidth, transition: "margin-left 0.4s ease-in-out" }}>
        <Outlet />
      </main>
    </>
  );
}
