import React, { useState } from 'react';
import { AuthHandlers } from '../../services/authHandlers';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Register() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('error');

  const handleRegisterSubmit = async (formData) => {
    await AuthHandlers.register(formData, setAlertMessage, setAlertType);
  };

  const fields = [
    {
      id: 'nome',
      label: 'Nome Completo:',
      type: 'text',
      name: 'fullName',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 'email',
      label: 'E-mail:',
      type: 'email',
      name: 'email',
      placeholder: 'Digite seu e-mail',
    },
    {
      id: 'telefone',
      label: 'Telefone:',
      type: 'text',
      name: 'phoneNumber',
      placeholder: 'Digite seu telefone',
    },
    {
      id: 'crp-crm',
      label: 'Número do CRP/CRM:',
      type: 'text',
      name: 'crpCrm',
      placeholder: 'Digite seu número do CRP/CRM',
    },
    {
      id: 'uf',
      label: 'UF:',
      type: 'text',
      name: 'uf',
      placeholder: 'Digite sua UF',
    },
  ];

  const links = [
    { to: '/login', text: 'Já tem conta? Faça login', key: 'login' },
  ];

  return (
    <AuthLayout
      title="Cadastre-se"
      subtitle={
        <>
          <p style={{ fontWeight: '700' }}>
            Bem-vindo ao Boamente!
          </p>
          <div style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: '1.4',
            padding: '0.5rem',
          }}>
            Seus dados serão analisados.
            Quando validados, você receberá um e-mail com as
            instruções de acesso.
          </div>
        </>
      }
      fields={fields}
      links={links}
      buttonText="Cadastrar-se"
      onSubmit={handleRegisterSubmit}
      alertMessage={alertMessage}
      alertType={alertType}
      onCloseAlert={() => setAlertMessage(null)}
    />
  );
}
