import {
  LayoutDashboard,
  UserPlus,
  Users,
//   FileText, Registro de Sessões
//   Keyboard, Teclado Virtual
  Settings, 
//   Headphones, Suporte
//   Wrench, Menu Instalação
  Headphones,        
  LogOut            
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
import ListPatient from '../pages/ListPatients/ListPatient';
import ConfigurationPage from "../pages/ConfigurationPage/ConfigurationPage";
import Support from "../pages/Support/Support";
import KeyboardConsent from "../pages/KeyboardTerms/consent/KeyboardConsent";
import KeyboardConsentAccept from "../pages/KeyboardTerms/accept/KeyboardConsentAccept";

const iconSize = 25;

export const publicRoutes = [
    { path: '/', element: <HomePage />, title: 'Página Inicial', layout: 'public' },
    { path: '/recursos', element: <Recursos />, title: 'Recursos', layout: 'public' },
    { path: '/contato', element: <Contato />, title: 'Contato', layout: 'public' },
    { path: '/instalacaoteclado', element: <KeyboardConsent />, title: 'Consentimento para Uso do Teclado', layout: 'public' },
    { path: '/instalacaotecladoaceito', element: <KeyboardConsentAccept />, title: 'Instalação do Teclado', layout: 'public' },
];

export const privateRoutes = [
    { divider: true },
    { path: '/dashboardgeral', element: <DashboardGeneral />, title: 'Dashboard Geral', layout: 'private', visible: true, icon: <LayoutDashboard size={iconSize} /> },
    { path: '/paineldopaciente/:id', element: <PatientPanel />, title: 'Painel Clínico do Paciente', layout: 'private', visible: false,  icon: <LayoutDashboard size={iconSize} /> },
    { divider: true },
    { path: '/cadastrarpaciente', element: <CadastroPaciente />, title: 'Cadastro de Pacientes', layout: 'private', visible: true, icon: <UserPlus size={iconSize} /> },
    { path: '/listarpacientes', element: <ListPatient />, title: 'Listagem de Pacientes', layout: 'private', visible: true, icon: <Users size={iconSize} /> },
    { divider: true },
    { path: '/configuracoes', element: <ConfigurationPage />, title: 'Configurações', layout: 'private', visible: true, icon: <Settings size={iconSize} /> },
    { path: '/suporte', element: <Support />, title: 'Suporte', layout: 'private', visible: true, icon: <Headphones size={iconSize} /> },
    { title: 'Sair', layout: 'private', visible: true, icon: <LogOut size={iconSize} /> , action: () => window.location.href = '/' },
];

export const authRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/cadastro', element: <Cadastro /> },
    { path: '/redefinirsenha', element: <RedefinirSenha /> },
    { path: '/redefinirnovasenha', element: <NovaSenha /> },
];


