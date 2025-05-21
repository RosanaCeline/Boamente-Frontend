import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';

export default function Login() {
  const navigate = useNavigate();

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
      name: 'password',
      placeholder: 'Digite sua senha',
      required: true,
    },
  ];

  const links = [
    { to: '/cadastro', text: 'Criar minha conta', key: 'register' },
    { to: '/redefinirsenha', text: 'Esqueci a senha', key: 'reset' },
  ];

  // Ainda verificando
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no login");
      }

      const data = await response.json();
      
      // Armazena o token (se seu backend retornar um)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      console.log("Login realizado com sucesso:", data);
      navigate('/dashboard'); // Redireciona para a página após login
      
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    }
  };

  return (
    <AuthLayout
      title="Login"
      fields={fields}
      links={links}
      buttonText="Entrar"
      onSubmit={handleSubmit}
    />
  );
}