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
      name: 'fullName',
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
      name: 'phoneNumber',
      placeholder: 'Digite seu telefone',
      required: true,
    },
    {
      id: 'crp-crm',
      label: 'Número do CRP/CRM:',
      type: 'text',
      name: 'crpCrm',
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

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          crpCrm: formData.crpCrm,
          uf: formData.uf,
        }),
      });

      if (!response.ok) throw new Error("Erro no cadastro");

      const data = await response.json();
      console.log("Usuário cadastrado com sucesso:", data);
      navigate("/login");
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    }
  };

  return (
    <AuthLayout
      title="Cadastre-se"
      subtitle="Bem-vindo ao Boamente!"
      fields={fields}
      buttonText="Cadastrar-se"
      onSubmit={handleSubmit}
    />
  );
}
