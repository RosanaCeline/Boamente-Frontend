import React, { use, useEffect, useState } from "react";
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
  fetchAverageRiskLevel,
  fetchRiskLevelBar
} from "../../../services/dashboardService";
import { formatSentimentDataByPeriod } from "../../../utils/chartUtils";
import LogoBoamente from "../../../assets/images/homepage/logo-boamente-upscale.png";

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
  const [averageDataByPeriod, setAverageRisByPeriod] = useState({});
  const [riskLevelBarToday, setRiskLevelBarToday] = useState({
    baixo: 0,
    moderado: 0,
    alto: 0
  });

  // Carrega os dados gerais e os dados de evolução para o período atual
  useEffect(() => {
    const loadDashboardData = async () => {
      setDashboardData(prev => ({ ...prev, loading: true }));
      try {
        // Carrega dados gerais
        const [
          activePatients,
          insightData,
          newHighRiskCount,
          worsenedRisk,
          ageData, 
          genderData,
        ] = await Promise.all([
          fetchActivePatients(),
          fetchInsight(),
          fetchNewHighRiskCases(),
          fetchWorsenedPatients(),
          fetchPatientsByAgeGroup(),
          fetchPatientsByGender()
        ]);

        // Atualiza dados gerais
        setDashboardData(prev => ({
          ...prev,
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
            genderData.find(g => !['M','F'].includes(g.gender))?.total || 0
          ],
          loading: false,
          error: null
        }));

        // Carrega evolução de risco separadamente
        const riskEvolution= await fetchRiskEvolutionOverTime();
        const averageRisk = await fetchAverageRiskLevel();
        const riskLevel = await fetchRiskLevelBar();
        console.log("🚨 Dados recebidos de fetchRiskLevelBar:", riskLevel);

        setRiskDataByPeriod(riskEvolution);
        setAverageRisByPeriod(averageRisk);
        setRiskLevelBarToday(riskLevel);

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
  }, []); // <-- vazio, para não criar loop infinito

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
    return (
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
    );

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
      
      <div className={styles.gridCharts}>
        <section className={styles.avgChart}>
          <AverageRiskLevelChart 
            weeklyData={averageDataByPeriod} 
          />
        </section>

        <section className={styles.barChart}>
          <BarAgeChart 
            labels={dashboardData.ageData.labels} 
            dataValues={dashboardData.ageData.values} 
          />
        </section>

        <section className={styles.riskBar}>
          <RiskLevelBarChart
            riskLevelBarToday={riskLevelBarToday}
          />
        </section>

        <section className={styles.riskEvol}>
          <RiskLevelEvolutionChart
            dataSetsByPeriod={riskDataByPeriod} // Já está no formato { labels, Positive, Neutral, Negative }
          />
        </section>

        <section className={styles.pieChart}>
          <PieSexChart dataValues={dashboardData.genderData} />
        </section>
      </div>
    </div>
  );
};

export default DashboardGeneral;
