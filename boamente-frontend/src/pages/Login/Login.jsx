import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthHandlers } from '../../services/authHandlers';
import { jwtDecode } from 'jwt-decode';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('error');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // em segundos

        if (decoded.exp && decoded.exp > currentTime) {
          // Token válido
          navigate('/dashboardgeral');
        } else {
          // Token expirado
          localStorage.removeItem('authToken');
        }
      } catch (e) {
        // Token inválido/corrompido
        localStorage.removeItem('authToken');
      }
    }
  }, [navigate]);


  const handleLoginSubmit = async (formData) => {
      const { rememberMe } = formData;
      await AuthHandlers.login(formData, navigate, rememberMe, setAlertMessage, setAlertType);
  };

  const fields = [
    {
      id: 'email',
      label: 'E-mail:',
      type: 'text',
      name: 'email',
      placeholder: 'Digite seu e-mail',
      required: true,
    },
    {
      id: 'senha',
      label: 'Senha:',
      type: 'password',
      name: 'password',
      placeholder: 'Digite sua senha',
      required: true,
    },
    {
      id: 'lembrar',
      label: 'Lembre de mim',
      type: 'checkbox',
      name: 'rememberMe', // nome importante
    },
  ];

  const links = [
    { to: '/cadastro', text: 'Criar minha conta', key: 'register' },
    { to: '/redefinirsenha', text: 'Esqueci a senha', key: 'reset' },
  ];

  return (
    <AuthLayout
      title="Login"
      subtitle="Bem-vindo de volta!"
      fields={fields}
      links={links}
      buttonText="Entrar"
      onSubmit={handleLoginSubmit}
      alertMessage={alertMessage}
      alertType={alertType}
      onCloseAlert={() => setAlertMessage(null)}
    />
  );
}