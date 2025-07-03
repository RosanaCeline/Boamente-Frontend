import React, { useEffect, useState } from "react";
import "../../../style.css"
import styles from "./DashboardGeneral.module.css"; 
import CardGeneral from "../../../components/Charts/Card/CardGeneral";
import BarAgeChart from "../../../components/Charts/BarAgeChart/BarAgeChart";
import PieSexChart from "../../../components/Charts/PieSexChart/PieSexChart";
import RiskLevelBarChart from "../../../components/Charts/RiskLevelBarChart/RiskLevelBarChart";
import RiskLevelEvolutionChart from "../../../components/Charts/RiskLevelEvolutionChart/RiskLevelEvolutionChart";
import AverageRiskLevelChart from "../../../components/Charts/AverageRiskLevelChart/AverageRiskLevelChart";
import GroupedBarAgeRiskChart from "../../../components/Charts/GroupedBarAgeRiskChart/GroupedBarAgeRiskChart";
import GroupedBarSexRiskChart from "../../../components/Charts/GroupedBarSexRiskChart/GroupedBarSexRiskChart"
import { 
  fetchActivePatients, 
  fetchPatientsByAgeGroup, 
  fetchPatientsByGender, 
  fetchPatientsByRiskLevel, 
  fetchSentimentByPeriod 
} from "../../../services/dashboardService";
import { formatSentimentDataByPeriod } from "../../../utils/chartUtils";

// Constantes para tradução e dados mockados
const sentimentTranslationMap = {
  Neutral: "Neutro",
  Positive: "Positivo",
  Negative: "Negativo"
};

const sexLabels = ['Masculino', 'Feminino', 'Não declarado'];

const DashboardGeneral = () => {
  // Estados (mantenha os existentes)
  const [dashboardData, setDashboardData] = useState({
    activePatients: null,
    ageData: { labels: [], values: [] },
    genderData: [0, 0, 0],
    riskLevelData: [],
    sentimentDataByPeriod: {},
    loading: true,
    error: null
  });

  // ✅ Adicione este novo estado para controlar o período
  const [selectedPeriod, setSelectedPeriod] = useState({
    type: 'WEEKLY', // Pode ser 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 dias atrás
    endDate: new Date() // hoje
  });

  const handlePeriodChange = (frontendPeriod) => {
    // Converte o período do frontend para o formato do backend
    const periodMap = {
      semana: 'WEEKLY',
      mes: 'MONTHLY',
      trimestre: 'QUARTERLY',
      ano: 'YEARLY'
    };
    
    setSelectedPeriod(prev => ({
      ...prev,
      type: periodMap[frontendPeriod] || 'WEEKLY'
    }));
  };

  // Carrega todos os dados do dashboard
  useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const [
        activePatients, 
        ageData, 
        genderData, 
        riskLevelData, 
        sentimentData
      ] = await Promise.all([
        fetchActivePatients(),
        fetchPatientsByAgeGroup(),
        fetchPatientsByGender(),
        fetchPatientsByRiskLevel(),
        // ✅ Modifique esta chamada para incluir os parâmetros de período
        fetchSentimentByPeriod(
          selectedPeriod.type,
          selectedPeriod.startDate,
          selectedPeriod.endDate
        )
      ]);

        const sentimentDataFormatted = formatSentimentDataByPeriod(sentimentData);

        console.log("Dados brutos (API):", sentimentData);
        console.log("Dados formatados para gráfico:", sentimentDataFormatted);

        setDashboardData({
          activePatients,
          ageData: {
            labels: ageData.map(d => d.ageGroup),
            values: ageData.map(d => d.quantity)
          },
          genderData: genderData.map(item => item.count),
          riskLevelData,
          sentimentDataByPeriod: formatSentimentDataByPeriod(sentimentData),
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: "Erro ao carregar dados do dashboard"
        }));
      }
    };

    loadDashboardData();
  }, [selectedPeriod]); // ✅ Adicione selectedPeriod como dependência

  // Dados para os cards
  const cardData = [
    { 
      title: 'Total de Pacientes Ativos', 
      value: dashboardData.activePatients !== null 
        ? `${dashboardData.activePatients} pacientes` 
        : 'Carregando...', 
      loading: dashboardData.activePatients === null 
    },
    { 
      title: 'Insight Automático', 
      value: '+15% de risco alto', 
      highlight: true, 
      small: 'em relação à última semana' 
    },
    { 
      title: 'Novos Casos de Risco Elevado', 
      value: '8', 
      small: 'no último mês' 
    },
    { 
      title: 'Piora no Nível de Risco', 
      value: '5 pacientes', 
      highlight: true, 
      small: '= 3,8% do total' 
    },
  ];

  // Se estiver carregando
  if (dashboardData.loading) {
    return <div className={styles.loading}>Carregando dashboard...</div>;
  }

  // Se ocorrer erro
  if (dashboardData.error) {
    return <div className={styles.error}>{dashboardData.error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard Geral - Indicadores</h2>
      
      {/* Cards */}
      <div className={styles.gridIndicators}>
        {cardData.map((item, index) => (
          <CardGeneral
            key={index}
            title={item.title}
            value={item.value}
            highlight={item.highlight}
            small={item.small}
            loading={item.loading}
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className={styles.gridCharts}>
        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Faixa Etária</h2>
          <BarAgeChart 
            labels={dashboardData.ageData.labels} 
            dataValues={dashboardData.ageData.values} 
          />
        </section>
        
        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Sexo</h2>
          <PieSexChart dataValues={dashboardData.genderData} />
        </section>

        <section>
          <h2 className={styles.heading}>Evolução de Níveis de Risco ao Longo do Tempo</h2>
          {dashboardData.sentimentDataByPeriod ? (
            <RiskLevelEvolutionChart 
              dataSetsByPeriod={dashboardData.sentimentDataByPeriod} 
            />
          ) : (
            <div className={styles.loading}>Carregando dados de evolução...</div>
          )}
        </section>
        
        <section>
          <h2 className={styles.heading}>Média Geral do Nível de Risco</h2>
          <AverageRiskLevelChart 
            weeklyData={dashboardData.sentimentDataByPeriod?.week || []} 
          />
        </section>

        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Nível de Risco</h2>
          <RiskLevelBarChart 
            labels={dashboardData.riskLevelData.map(item => 
              sentimentTranslationMap[item.sentiment] || item.sentiment
            )} 
            dataValues={dashboardData.riskLevelData.map(item => item.count)} 
          />
        </section>
      </div>
    </div>
  );
};

export default DashboardGeneral;