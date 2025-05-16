import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

import Home from '../pages/Home/Home';
import Recursos from '../pages/Resources/Resources';
import Contato from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Register/Register';
import RedefinirSenha from '../pages/ResetPassword/ResetPasswordEmail';
import NovaSenha from '../pages/ResetPassword/ResetPasswordNew';

export default function AppRoutes() {
  const { pathname } = useLocation();

  // hidden Header and Footer on these routes
  const hideLayoutRoutes = ['/login', '/cadastro', '/redefinirsenha'];
  const showLayout = !hideLayoutRoutes.includes(pathname);

  return (
    <>
      {showLayout && <Header />}
      
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />

        {/* protected */}
        <Route path="/redefinirnovasenha" element={<PrivateRoute><NovaSenha /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><h1>Dashboard</h1></PrivateRoute>} />
      </Routes>

      {showLayout && <Footer />}
    </>
  );
}
