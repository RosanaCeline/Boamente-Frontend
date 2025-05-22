/**
 * Serviço de autenticação - Gerencia chamadas à API de autenticação
 */
export const AuthService = {
  async register(userData) {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData.message = "Erro desconhecido do servidor.";
      }

      const error = new Error(errorData.message || "Erro desconhecido");

      error.status = response.status;
      error.backendMessage = errorData.message;
      throw error;
    }

    return await response.json();
  },

  // Outros métodos podem ser adicionados aqui (login, logout, etc)
};