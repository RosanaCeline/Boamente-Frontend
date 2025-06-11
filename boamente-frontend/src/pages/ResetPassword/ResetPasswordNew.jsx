import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthHandlers } from '../../services/authHandlers';

export default function ResetPasswordNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetConfirmPasswordSubmit = async (formData) => {
    await AuthHandlers.resetConfirmPassword(token, formData, navigate);
  };

  const fields = [
    {
      id: 'nova-senha',
      label: 'Nova senha:',
      type: 'password',
      name: 'newPassword',
      placeholder: 'Digite sua nova senha',
      required: true
    },
    {
      id: 'nova-senha2',
      label: 'Digite novamente a senha:',
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Digite novamente sua senha',
      required: true
    }
  ];

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
      onSubmit={handleResetConfirmPasswordSubmit}
      buttonText="Redefinir senha"
    />
  );
}
