import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function ResetPassword() {
  const fields = [
    {
      id: 'email',
      label: 'E-mail:',
      type: 'text',
      name: 'email',
      placeholder: 'Digite seu e-mail ou código de acesso',
      required: true,
    },
  ];

  return (
    <AuthLayout
      title="Redefinição de senha"
      subtitle={
        <>
          <strong>Esqueceu sua senha?</strong>
          <br />
          Informe seu e-mail e enviaremos um e-mail com instruções de como redefinir sua senha.
        </>
      }
      fields={fields}
      buttonText="Redefinir senha"
      onSubmit={(e) => {
        // lógica para enviar e-mail de redefinição
      }}
    />
  );
}
