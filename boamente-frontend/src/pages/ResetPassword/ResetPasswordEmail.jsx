import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { AuthHandlers } from '../../services/authHandlers';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (formData) => {
        await AuthHandlers.resetPassword(formData, navigate);
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
      onSubmit={handleResetPasswordSubmit}
    />
  );
}
