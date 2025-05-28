import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateLayout from '../components/layout/PrivateLayout/PrivateLayout';
import PublicLayout from '../components/layout/PublicLayout/PublicLayout';
import { publicRoutes, privateRoutes, authRoutes } from './listRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Autenticação */}
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Públicas com layout */}
      <Route path="/" element={<PublicLayout />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Protegidas com layout */}
      <Route element={<PrivateLayout routes={privateRoutes} />}>
        {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}
