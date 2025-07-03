import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateLayout from '../components/layout/PrivateLayout/PrivateLayout';
import PublicLayout from '../components/layout/PublicLayout/PublicLayout';
import ProtectedRoute from '../routes/ProtectedRoute';
import PrivateRoute from './PrivateRoute';

import { publicRoutes, protectedRoutes, privateRoutes, authRoutes } from './listRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de autenticação - sem layout protegido */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Rotas públicas normais */}
      <Route path="/" element={<PublicLayout />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Rotas que precisam de token no query param (protegidas, mas com layout público) */}
      <Route element={<PublicLayout />}>
        <Route element={<ProtectedRoute routes={protectedRoutes} />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>*/
    
      {/* Rotas privadas protegidas por token */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout routes={privateRoutes} />}>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}
