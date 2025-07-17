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
      {/* Rotas de autenticação */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Rotas públicas */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        {protectedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={<PublicLayout>{element}</PublicLayout>} />
        ))}
      </Route>

      {/* Rotas privadas */}
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