import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from '../../services/authService';
import * as yup from 'yup';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
  const navigate = useNavigate();

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

  const handleSubmit = async (formData) => {
    try {
      const userData = ({
        email: formData.email,
        password: formData.password,
      })

      const response = await AuthService.apiRequest('/auth/login', 'POST', userData);
      
      // Armazena o token
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      console.log("Login realizado com sucesso:", response);
      navigate('/dashboard'); // Redireciona para a página após login
      
    } catch (error) {
      let errorMessage = "Erro inesperado. Tente novamente.";

       if (error.message.includes('Network Error')) {
        errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
      } else if (error.status === 400) {
        const mensagem = error.backendMessage.toLowerCase();
        errorMessage = 'Dados inválidos: Verifique todos os campos';
      } else if (error.status === 401 && error.backendMessage === 'Senha incorreta.') {
        errorMessage = 'Senha Incorreta.';
      } else if (error.status === 403) {
        errorMessage = 'Acesso negado. Verifique suas permissões.';
      } else if (error.status === 404 && error.backendMessage == 'Usuário não encontrado.') {
        errorMessage = 'Nenhum usuário encontrado com este e-mail.';
      } else if (error.status === 500) {
        errorMessage = 'Erro interno no servidor. Tente mais tarde.';
      } else if (error.message.toLowerCase().includes('timeout')) {
        errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
      }

      toast.error(errorMessage, {
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Bem-vindo de volta!"
      fields={fields}
      links={links}
      buttonText="Entrar"
      onSubmit={handleSubmit}
    />
  );
}