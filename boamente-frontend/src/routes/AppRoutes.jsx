import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateLayout from '../components/layout/PrivateLayout/PrivateLayout';
import PublicLayout from '../components/layout/PublicLayout/PublicLayout';

// Pages
import Home from '../pages/Home/Home';
import Recursos from '../pages/Resources/Resources';
import Contato from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Register/Register';
import RedefinirSenha from '../pages/ResetPassword/ResetPasswordEmail';
import NovaSenha from '../pages/ResetPassword/ResetPasswordNew';
import CadastroPaciente from '../pages/Register/RegisterPatient';

// Rotas públicas
const publicRoutes = [
  { path: '/', element: <Home />, title: 'Página Inicial' },
  { path: '/recursos', element: <Recursos />, title: 'Recursos' },
  { path: '/contato', element: <Contato />, title: 'Contato' },
];

// Rotas protegidas
const privateRoutes = [
  { path: '/dashboard', element: <h1>Dashboard</h1>, title: 'Dashboard' },
  { path: '/cadastrarpaciente', element: <CadastroPaciente />, title: 'Cadastrar Pacientes' },
];

export default function AppRoutes() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />
        <Route path="/redefinirnovasenha" element={<NovaSenha />} />
      </Route>

      {/* Públicas com layout */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Protegidas com layout e título */}
      <Route element={<PrivateLayout routes={privateRoutes} />}>
        {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}
