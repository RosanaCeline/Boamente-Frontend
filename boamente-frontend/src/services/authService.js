/**
 * Serviço de autenticação - Gerencia chamadas à API de autenticação
 */
export const AuthService = {
  async apiRequest(endpoint, method = "GET", data = null) {
    const token = localStorage.getItem('authToken');

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // só adiciona se token existir
      },
    };

    if (data) {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || "Erro desconhecido");

        error.status = response.status;
        error.backendMessage = errorData.message;

        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  // Outros métodos podem ser adicionados aqui
};

export async function validateTokenBackend(token) {
  try {
    const response = await fetch('http://localhost:8080/validate-token/auth', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response.ok;
  } catch (error) {
    console.error("Erro ao validar token no backend", error);
    return false;
  }
};