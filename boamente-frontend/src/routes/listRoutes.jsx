import {
  LayoutDashboard,
//   FileText, Registro de Sessões
//   Users, Lista de Pacientes
//   Keyboard, Teclado Virtual
  UserPlus,
//   Settings, Configurações
//   Headphones, Suporte
//   Wrench, Menu Instalação
} from "lucide-react";

import HomePage from '../pages/Home/Home';
import Recursos from '../pages/Resources/Resources';
import Contato from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Register/Register';
import RedefinirSenha from '../pages/ResetPassword/ResetPasswordEmail';
import NovaSenha from '../pages/ResetPassword/ResetPasswordNew';
import CadastroPaciente from '../pages/Register/RegisterPatient';
import DashboardGeneral from "../pages/Dashboard/General/DashboardGeneral";
import PatientPanel from '../pages/Dashboard/Personal/PatientPanel';


const iconSize = 25;

export const publicRoutes = [
    { path: '/', element: <HomePage />, title: 'Página Inicial', layout: 'public' },
    { path: '/recursos', element: <Recursos />, title: 'Recursos', layout: 'public' },
    { path: '/contato', element: <Contato />, title: 'Contato', layout: 'public' },
];

export const privateRoutes = [
    { divider: true },
    { path: '/dashboardgeral', element: <DashboardGeneral />, title: 'Dashboard Geral', layout: 'private', icon: <LayoutDashboard size={iconSize} /> },
    { path: '/paineldopaciente', element: <PatientPanel />, title: 'Painel Clínico do Paciente', layout: 'private', icon: <LayoutDashboard size={iconSize} /> },
    { path: '/cadastrarpaciente', element: <CadastroPaciente />, title: 'Cadastro de Pacientes', layout: 'private', icon: <UserPlus size={iconSize} /> },
    { divider: true },
];

export const authRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/cadastro', element: <Cadastro /> },
    { path: '/redefinirsenha', element: <RedefinirSenha /> },
    { path: '/redefinirnovasenha', element: <NovaSenha /> },
];


