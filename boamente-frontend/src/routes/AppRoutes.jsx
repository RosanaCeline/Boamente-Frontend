import React from 'react';
import { Routes, Route} from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';

import PrivateLayout from '../components/layout/PrivateLayout/PrivateLayout';
import PublicLayout from '../components/layout/PublicLayout/PublicLayout';

// Pages Public
import Home from '../pages/Home/Home';
import Recursos from '../pages/Resources/Resources';
import Contato from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Register/Register';
import RedefinirSenha from '../pages/ResetPassword/ResetPasswordEmail';

// Pages protected
import NovaSenha from '../pages/ResetPassword/ResetPasswordNew';
import CadastroPaciente from '../pages/Register/RegisterPatient';

export default function AppRoutes() {

  return (
    <Routes>
      {/* routes authentication */}
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha />} />
        <Route path="/redefinirnovasenha" element={<NovaSenha />} />
      </Route>

      {/* public routes w/ header and footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/contato" element={<Contato />} />
        
      </Route>

      {/* protected routes w/ sidebar */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/cadastrarpaciente" element={<CadastroPaciente />} />
      </Route>

      {/* futute */}
      {/* <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> */}
    </Routes>
  );
}
