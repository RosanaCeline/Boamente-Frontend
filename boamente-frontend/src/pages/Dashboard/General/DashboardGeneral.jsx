import React, { useEffect, useState } from "react";
import "../../../style.css";
import styles from "./DashboardGeneral.module.css"; 
import CardGeneral from "../../../components/Charts/Card/CardGeneral";
import BarAgeChart from "../../../components/Charts/BarAgeChart/BarAgeChart";
import PieSexChart from "../../../components/Charts/PieSexChart/PieSexChart";
import RiskLevelBarChart from "../../../components/Charts/RiskLevelBarChart/RiskLevelBarChart";
import RiskLevelEvolutionChart from "../../../components/Charts/RiskLevelEvolutionChart/RiskLevelEvolutionChart";
import AverageRiskLevelChart from "../../../components/Charts/AverageRiskLevelChart/AverageRiskLevelChart";
import {
  fetchActivePatients, 
  fetchInsight,
  fetchNewHighRiskCases,
  fetchWorsenedPatients,
  fetchPatientsByAgeGroup, 
  fetchPatientsByGender,
  fetchRiskEvolutionOverTime,
  fetchPatientsByRiskLevel, 
  fetchSentimentByPeriod
} from "../../../services/dashboardService";
import { formatSentimentDataByPeriod } from "../../../utils/chartUtils";
import LogoBoamente from "../../../assets/images/homepage/logo-boamente-upscale.png";

const sentimentTranslationMap = {
  Neutral: "Neutro",
  Positive: "Positivo",
  Negative: "Negativo"
};

// Mapeamento frontend -> backend para períodos
const periodMap = {
  semana: "WEEKLY",
  mes: "MONTHLY",
  trimestre: "QUARTERLY",
  ano: "YEARLY"
};

const DashboardGeneral = () => {
  const [dashboardData, setDashboardData] = useState({
    activePatients: null,
    insightData: null,
    newHighRiskCount: null,
    worsenedRisk: null,
    ageData: { labels: [], values: [] },
    genderData: [0, 0, 0],
    riskLevelData: [],
    sentimentDataByPeriod: {},
    loading: true,
    error: null
  });

  // Estado para evolução de risco por período - usar somente este!
  const [riskDataByPeriod, setRiskDataByPeriod] = useState({});

  // Estado para o período selecionado - valor backend em caixa alta
  const [selectedPeriod, setSelectedPeriod] = useState("WEEKLY");

  // Função que o gráfico vai chamar para alterar o período
  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
  };

  function rotateArray(arr, count) {
    return [...arr.slice(count), ...arr.slice(0, count)];
  };

  // Função para converter o dado bruto da API para o formato esperado pelo gráfico
  function formatDataForRiskEvolution(rawData, period) {
    let labels = [], Positive = [], Neutral = [], Negative = [];

    if (period === 'WEEKLY') {
      // Label vem como 'segunda-feira', 'terça-feira', etc.
      const dayMap = {
        'segunda-feira': 'Seg',
        'terça-feira': 'Ter',
        'quarta-feira': 'Qua',
        'quinta-feira': 'Qui',
        'sexta-feira': 'Sex',
        'sábado': 'Sáb',
        'domingo': 'Dom',
      };

      labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const dataMap = {};

      for (const item of rawData) {
        const dayLabel = dayMap[item.label?.toLowerCase()] || item.label;
        dataMap[dayLabel] = {
          low: item.lowRiskCount,
          medium: item.mediumRiskCount,
          high: item.highRiskCount
        };
      }

      for (const label of labels) {
        Positive.push(dataMap[label]?.low || 0);
        Neutral.push(dataMap[label]?.medium || 0);
        Negative.push(dataMap[label]?.high || 0);
      }

    } else if (period === 'MONTHLY') {
      // Labels já vêm como 'Semana 1', 'Semana 2', etc.
      labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
      const dataMap = {};

      for (const item of rawData) {
        dataMap[item.label] = {
          low: item.lowRiskCount,
          medium: item.mediumRiskCount,
          high: item.highRiskCount
        };
      }

      for (const label of labels) {
        Positive.push(dataMap[label]?.low || 0);
        Neutral.push(dataMap[label]?.medium || 0);
        Negative.push(dataMap[label]?.high || 0);
      }

    } else if (period === 'QUARTERLY' || period === 'YEARLY') {
      labels = period === 'YEARLY'
        ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        : ['Jan', 'Fev', 'Mar']; // trimestre fixo

      const dataMap = {};
      for (const item of rawData) {
        const label = item.label;
        dataMap[label] = {
          low: item.lowRiskCount,
          medium: item.mediumRiskCount,
          high: item.highRiskCount
        };
      }

      for (const label of labels) {
        Positive.push(dataMap[label]?.low || 0);
        Neutral.push(dataMap[label]?.medium || 0);
        Negative.push(dataMap[label]?.high || 0);
      }
    }

    return { labels, Positive, Neutral, Negative };
  }

  // Carrega os dados gerais e os dados de evolução para o período atual
  useEffect(() => {
    const loadDashboardData = async () => {
      setDashboardData(prev => ({ ...prev, loading: true }));
      try {
        // Para simplificar, carrega só o período selecionado
        const [
          activePatients,
          insightData,
          newHighRiskCount,
          worsenedRisk,
          ageData, 
          genderData, 
          riskLevelData, 
          sentimentData,
          riskEvolutionRaw
        ] = await Promise.all([
          fetchActivePatients(),
          fetchInsight(),
          fetchNewHighRiskCases(),
          fetchWorsenedPatients(),
          fetchPatientsByAgeGroup(),
          fetchPatientsByGender(),
          fetchPatientsByRiskLevel(),
          fetchSentimentByPeriod(selectedPeriod, new Date(), new Date()),
          fetchRiskEvolutionOverTime(selectedPeriod)
        ]);

        // Converte os dados brutos para o formato do gráfico
        const formattedRiskEvolution = formatDataForRiskEvolution(riskEvolutionRaw || [], selectedPeriod);

        console.log("Raw do DashboardGeneral:", riskEvolutionRaw );
        console.log("Formatted do DashboardGeneral:", formattedRiskEvolution);

        // Atualiza o estado com os dados formatados
        setRiskDataByPeriod(prev => ({
          ...prev,
          [selectedPeriod]: formattedRiskEvolution
        }));

        // Atualiza demais dados do dashboard
        setDashboardData({
          activePatients,
          insightData,
          newHighRiskCount,
          worsenedRisk,
          ageData: {
            labels: ageData.map(d => d.ageGroup),
            values: ageData.map(d => d.quantity)
          },
          genderData: [
            genderData.find(g => g.gender === 'M')?.total || 0,
            genderData.find(g => g.gender === 'F')?.total || 0,
            genderData.find(g => !['M', 'F'].includes(g.gender))?.total || 0
          ],
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
  }, [selectedPeriod]);

  const cardData = [
    { 
      title: 'Total de Pacientes Ativos', 
      value: dashboardData.activePatients !== null 
        ? `${dashboardData.activePatients} ${dashboardData.activePatients === 1 ? 'paciente' : 'pacientes'}` 
        : 'Carregando...', 
      loading: dashboardData.activePatients === null,
      info: 'Número total de pacientes ativos cadastrados na plataforma.'
    },
    { 
      title: 'Insight Automático', 
      value: dashboardData.insightData?.insight || 'Carregando...', 
      highlight: true, 
      small: dashboardData.insightData?.context || '',
      info: 'Resumo automático gerado com base na tendência de classificações negativas.'
    },
    { 
      title: 'Novos Casos de Risco Elevado', 
      value: dashboardData.newHighRiskCount !== null
        ? `${dashboardData.newHighRiskCount} ${dashboardData.newHighRiskCount === 1 ? 'paciente' : 'pacientes'}`
        : 'Carregando...',
      small: 'no último mês',
      info: 'Pacientes que passaram a ter maioria das classificações como negativas no último mês.'
    },
    {
      title: 'Piora no Nível de Risco',
      value: dashboardData.worsenedRisk !== null
        ? `${dashboardData.worsenedRisk.quantidade} ${dashboardData.worsenedRisk.quantidade === 1 ? 'paciente' : 'pacientes'}`
        : 'Carregando...',
      highlight: true,
      small: dashboardData.worsenedRisk !== null
        ? `= ${dashboardData.worsenedRisk.percentual}% do total`
        : '',
      info: 'Pacientes cuja média de risco nas últimas semanas aumentou em relação ao mês anterior.'
    }
  ];

  if (dashboardData.loading) 
    return 
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinnerBackground}>
          <img
            src={LogoBoamente}
            alt="Logo do Boamente"
            className={styles.fixedImage}
          />
          <div className={styles.spinner}></div>
        </div>
        <p className={styles.spinnerText}>Carregando dados do paciente...</p>
      </div>

  if (dashboardData.error) {
    return <div className={styles.error}>{dashboardData.error}</div>;
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.gridIndicators}>
        {cardData.map((item, index) => (
          <CardGeneral
            key={index}
            title={item.title}
            value={item.value}
            highlight={item.highlight}
            small={item.small}
            info={item.info}
            loading={item.loading}
          />
        ))}
      </div>

      <h2 className={styles.heading}>Indicadores</h2>

      <div className={styles.gridCharts}>
        <section>
          <BarAgeChart 
            labels={dashboardData.ageData.labels} 
            dataValues={dashboardData.ageData.values} 
          />
        </section>
        
        <section>
          <PieSexChart dataValues={dashboardData.genderData} />
        </section>

        <section>
          {riskDataByPeriod[selectedPeriod]?.labels?.length > 0 ? (
            <RiskLevelEvolutionChart
              dataSetsByPeriod={riskDataByPeriod[selectedPeriod]} // Já está no formato { labels, Positive, Neutral, Negative }
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
            />
          ) : (
            <div className={styles.loading}>Carregando dados de evolução...</div>
          )}
        </section>
                
        <section>
          <AverageRiskLevelChart 
            weeklyData={dashboardData.sentimentDataByPeriod?.week || []} 
          />
        </section>

        <section>
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
