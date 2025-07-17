import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "../../../style.css"
import styles from "./PatientPanel.module.css"

import LogoBoamente from "../../../assets/images/homepage/logo-boamente-upscale.png"

import PatientInfoCard from "../../../components/List/PatientInfoCard"
import LineChart from "../../../components/Charts/LineChart/LineChart"
import InsightCard from "../../../components/Charts/InsightCard/InsightCard"
import RiskAverageChart from "../../../components/Charts/RiskAverageChart/RiskAverageChart"
import RiskDistributionChart from "../../../components/Charts/RiskDistributionChart/RiskLevelDistribution"
import RiskEvolutionChart from "../../../components/Charts/RiskEvolutionChart/RiskEvolutionChart"

import {
  fetchPatientInsight,
  fetchPatientLastNegativeClassification,
  fetchPatientInfo,

  // segundo dashboard
  fetchPatientRiskEvolution,

  // ultimo dashboard
  fetchPatientRiskDistribution
} from "../../../services/dashboardService";

export default function PatientPanel() {
  const { id } = useParams();
  const [erro, setErro] = useState(null);
  const [insight, setInsight] = useState(null);
  const [lastNegativeDate, setLastNegativeDate] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [evolucaoData, setEvolucaoData] = useState({
    labels: [],
    data: []
  });
  const [distribuicaoData, setDistribuicaoData] = useState([0, 0, 0]);
  
  useEffect(() => {
    setTimeout(() => {
      try {
        fetchPatientInfo(id)
          .then(data => {
            console.log("Paciente recebido:", data);
            setPaciente(data);
          })
            .catch(() => setPaciente(null));
      } catch (err) {
        setErro("Erro ao carregar dados do paciente.");
      }
    }, 2000);

    // Busca o insight individual da API
    fetchPatientInsight(id)
      .then(setInsight)
      .catch(() => setInsight(null));

  fetchPatientLastNegativeClassification(id)
    .then(data => {
      if (data?.date) {
        const date = new Date(data.date);
        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
        setLastNegativeDate(formattedDate);
      } else {
        setLastNegativeDate(null);
      }
    })
    .catch(() => setLastNegativeDate(null));
    
    fetchPatientRiskEvolution(id)
      .then(data => {
        setEvolucaoData({
          labels: data.labels,
          data: data.data
        });
      })
      .catch(() => setEvolucaoData({ labels: [], data: [] }));

    fetchPatientRiskDistribution(id)
    .then(data => {
      if (data && typeof data === "object") {
        setDistribuicaoData([data.positive, data.neutral, data.negative]);
      } else {
        setDistribuicaoData([0, 0, 0]);
      }
    })
    .catch(() => setDistribuicaoData([0, 0, 0]));
  }, [id]);

  const isLoading = !paciente || !insight || evolucaoData.labels.length === 0;

  return (
    <section className={styles.sectionPersonal}>
      <aside className={styles.patientInformation}>
        <PatientInfoCard patient={paciente} />
        <div className={styles.cardsContainer}>
          <InsightCard
            title="Insight Individual"
            value={insight?.insightText || "Carregando..."}
            info="Indica se o risco do paciente aumentou ou reduziu na última semana com base em classificações negativas."
          />
          <InsightCard
            title="Último Risco"
            value={
              lastNegativeDate
                ? `Alto (Negativo) em ${lastNegativeDate}`
                : "Sem riscos negativos nos últimos 30 dias"
            }
            info="Exibe a data da última classificação negativa registrada para o paciente nos últimos 30 dias."
          />
          <div className={styles.chartCard}>
            <RiskDistributionChart dataValues={distribuicaoData} />
          </div>
        </div>
      </aside>

      <section className={styles.charts}>
          {erro ? (
            <p>{erro}</p>
          ) : isLoading ? (
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
          ) : (
            <>
              <div className={styles.chartGroup}>
              <div className={styles.chartCard}>
                <RiskEvolutionChart labels={evolucaoData.labels} data={evolucaoData.data} />
              </div>

              <div className={styles.chartCard}>
                <RiskAverageChart patientId={id} />
              </div>
            </div>
          </>
        )}
      </section>
    </section>
  );
}