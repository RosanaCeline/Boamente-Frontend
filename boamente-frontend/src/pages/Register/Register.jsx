import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from '../../services/authService';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Register() {
  const navigate = useNavigate();

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

  const handleSubmit = async (formData) => {
    let toastId;

    try {
      toast.dismiss();

      toastId = toast.loading("Processando cadastro...");

      const userData = ({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        crpCrm: formData.crpCrm,
        uf: formData.uf,
      })

      const response = await AuthService.apiRequest('/auth/register', 'POST', userData);

      toast.update(toastId, {
        render: (
          <>
            Cadastro realizado com sucesso! <br />
            Redirecionando para login...
          </>
        ),
        type: "success",
        isLoading: false,
        autoClose: 3000,
        onClose: () => navigate('/login'),
      });

    } catch (error) {
      let errorMessage = 'Erro inesperado. Tente novamente.';
      
      if (error.message.includes('Network Error')) {
        errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos: ' + (
          error.message.includes('email') 
            ? 'E-mail já cadastrado' 
            : error.message.includes('crpCrm') || error.message.includes('CRP/CRM')
              ? 'CRP/CRM já cadastrado'
              : 'Verifique todos os campos'
        );
      } else if (error.status === 401) {
        errorMessage = 'Não autorizado.';
      } else if (error.status === 403) {
        errorMessage = 'Acesso negado. Verifique suas permissões.';
      } else if (error.status === 409) {
        errorMessage = 'Conflito: Usuário já existe.';
      } else if (error.status === 500) {
        errorMessage = 'Erro interno no servidor. Tente mais tarde.';
      } else if (error.message.toLowerCase().includes('timeout')) {
        errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
      } else {
        errorMessage = 'Erro desconhecido. Tente novamente.';
      }

      toast.update(toastId, {
        render: (
          <>
            {errorMessage}
          </>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <AuthLayout
      title="Cadastre-se"
      subtitle={
        <>
          <p style={{ fontWeight: '700'}}>
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
      onSubmit={handleSubmit}
    />
  );
}
