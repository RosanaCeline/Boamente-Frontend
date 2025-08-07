const API_BASE = 'http://localhost:8080/api/dashboard';

// Função genérica para fazer requisições (mantida como está)
async function fetchData(endpoint, errorMessage, params = {}) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

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
  } catch (error) {
    console.error(error);
    return endpoint.includes('active-patients') ? null : [];
  }
}

// Funções existentes (mantidas)
export const fetchActivePatients = () => 
  fetchData('active-patients', 'Erro ao buscar pacientes ativos');

export const fetchInsight = () => 
  fetchData('insight', 'Erro ao buscar insight dos pacientes');

export const fetchNewHighRiskCases = () =>
  fetchData('new-high-risk', 'Erro ao buscar novos casos de risco entre os pacientes');

export const fetchWorsenedPatients = () =>
  fetchData('worsened', 'Erro ao buscar pacientes com piora no nivel de risco');

export const fetchPatientsByAgeGroup = () => 
  fetchData('age-distribution', 'Erro ao buscar pacientes por faixa etária');

export const fetchPatientsByGender = () => 
  fetchData('sex-distribution', 'Erro ao buscar pacientes por sexo');

export const fetchRiskEvolutionOverTime = () =>
  fetchData('risk-evolution', 'Erro ao buscar evolução do nível de risco');

export const fetchAverageRiskLevel = () =>
  fetchData('average-risk', 'Erro ao obter evolução diária média de risco');

export const fetchRiskLevelBar = () =>
  fetchData('risk-distribution', 'Erro ao obter nível de risco atual');


export const fetchPatientsByRiskLevel = () => 
  fetchData('sex-distribution', 'Erro ao buscar pacientes por nível de risco');

// Atualize esta função específica
export const fetchSentimentByPeriod = (periodType, startDate, endDate) => {
  return fetchData(
    'sex-distribution',
    'Erro ao buscar evolução de sentimentos',
    {
      periodType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    }
  );
};

// Dashboards Individuais

export const fetchPatientInfo = async (patientId) => {
  return fetchData(`patient/${patientId}/info`, 'Erro ao buscar informações do paciente');
};

export const fetchPatientInsight = (patientId) => 
  fetchData(`patient/${patientId}/insight`, 'Erro ao buscar insight individual do paciente');

export const fetchPatientLastNegativeClassification = (patientId) => 
  fetchData(`patient/${patientId}/latest-negative`, 'Erro ao buscar última classificação negativa do paciente');

export const fetchPatientRiskEvolution = (patientId) =>
  fetchData(`patient/${patientId}/risk-evolution`, 'Erro ao buscar evolução dos níveis de ideação suicida do paciente');

export const fetchPatientRiskAverage = (patientId) =>
  fetchData(`patient/${patientId}/risk-average`, 'Erro ao buscar média de risco por período');

export const fetchPatientRiskDistribution = (patientId) =>
  fetchData(`patient/${patientId}/risk-distribution`, 'Erro ao buscar distribuição de risco do paciente');


