import React from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const fields = [
    {
      id: 'nome',
      label: 'Nome Completo:',
      type: 'text',
      name: 'nomeCompleto',
      placeholder: 'Digite seu nome completo',
      required: true,
    },
    {
      id: 'email',
      label: 'E-mail:',
      type: 'email',
      name: 'email',
      placeholder: 'Digite seu e-mail',
      pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$',
      title: 'Endereço de e-mail válido',
      required: true,
    },
    {
      id: 'telefone',
      label: 'Telefone:',
      type: 'text',
      name: 'telefone',
      placeholder: 'Digite seu telefone',
      required: true,
    },
    {
      id: 'crp-crm',
      label: 'Número do CRP/CRM:',
      type: 'text',
      name: 'crp-crm',
      placeholder: 'Digite seu número do CRP/CRM',
      required: true,
    },
    {
      id: 'uf',
      label: 'UF:',
      type: 'text',
      name: 'uf',
      placeholder: 'Digite sua UF',
      required: true,
    },
  ];

  return (
    <AuthLayout
      title="Cadastre-se"
      subtitle="Bem-vindo ao Boamente!"
      fields={fields}
      buttonText="Cadastrar-se"
      onSubmit={(e) => {
        // lógica de cadastro aqui (ex: chamada API)
        navigate('/login');
      }}
    />
  );
}
