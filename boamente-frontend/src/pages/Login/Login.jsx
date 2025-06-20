import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHandlers } from '../../services/authHandlers';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
      await AuthHandlers.login(formData, navigate);
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
    />
  );
}