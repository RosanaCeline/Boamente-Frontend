import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
  const fields = [
    {
      id: 'email',
      label: 'E-mail:',
      type: 'text',
      name: 'email',
      placeholder: 'Digite seu e-mail ou código de acesso',
      required: true,
    },
    {
      id: 'senha',
      label: 'Senha:',
      type: 'password',
      name: 'senha',
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
      fields={fields}
      links={links}
      buttonText="Entrar"
      onSubmit={(e) => {
        // lógica de login aqui
      }}
    />
  );
}