import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function ResetPasswordNew() {
  const fields = [
    {
      id: 'nova-senha',
      label: 'Nova senha:',
      type: 'password',
      name: 'novaSenha',
      placeholder: 'Digite sua nova senha',
      required: true
    },
    {
      id: 'nova-senha2',
      label: 'Digite novamente a senha:',
      type: 'password',
      name: 'novaSenha2',
      placeholder: 'Digite novamente sua senha',
      required: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validações
    window.location.href = '/login';
  };

  return (
    <AuthLayout
      title="Redefinição de senha"
      subtitle={
        <>
          <strong>Crie uma nova senha</strong>
          <br />
          Você poderá fazer login nesta conta utilizando uma nova senha.
        </>
      }
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Redefinir senha"
      redirectOnSubmit="/login"
    />
  );
}
