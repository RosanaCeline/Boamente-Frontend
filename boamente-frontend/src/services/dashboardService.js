const API_BASE = 'http://localhost:8080/api/dashboard';

// Função genérica para fazer requisições (mantida como está)
async function fetchData(endpoint, errorMessage, params = {}) {
  try {
    const token = localStorage.getItem("authToken");
    const url = new URL(`${API_BASE}/${endpoint}`);
    
    // Adiciona parâmetros de query se existirem
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(`[API RESPONSE] ${endpoint}:`, data);
    return data;

    return await response.json();
  } catch (error) {
    console.error(error);
    return endpoint.includes('active-patients') ? null : [];
  }
}

// Funções existentes (mantidas)
export const fetchActivePatients = () => 
  fetchData('active-patients', 'Erro ao buscar pacientes ativos');

export const fetchPatientsByAgeGroup = () => 
  fetchData('by-age-group', 'Erro ao buscar pacientes por faixa etária');

export const fetchPatientsByGender = () => 
  fetchData('count-gender', 'Erro ao buscar pacientes por sexo');

export const fetchPatientsByRiskLevel = () => 
  fetchData('risk-level', 'Erro ao buscar pacientes por nível de risco');

// Atualize esta função específica
export const fetchSentimentByPeriod = (periodType, startDate, endDate) => {
  return fetchData(
    'sentiment-distribution',
    'Erro ao buscar evolução de sentimentos',
    {
      periodType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    }
  );
};