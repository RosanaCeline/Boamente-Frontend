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
import RiskEvolutionChart from "../../../components/Charts/RiskEvolutionChart/RiskDistributionChart"

import {
  fetchPatientInsight,
  fetchPatientLastNegativeClassification,
  fetchPatientInfo
} from "../../../services/dashboardService";

export default function PatientPanel() {
  const { id } = useParams();
  const [registros, setRegistros] = useState(null);
  const [erro, setErro] = useState(null);
  const [insight, setInsight] = useState(null);
  const [lastNegativeDate, setLastNegativeDate] = useState(null);
  const [paciente, setPaciente] = useState(null);

  // Simulação de carregamento de registros + fetch do insight individual
  useEffect(() => {
    setTimeout(() => {
      try {
          fetchPatientInfo(id)
            .then(data => {
              console.log("Paciente recebido:", data);
              setPaciente(data);
            })
            .catch(() => setPaciente(null));

        setRegistros([
          { data: "2025-05-01", media: 45.2, sessao: true },
          { data: "2025-05-02", media: 60.1, sessao: false },
          { data: "2025-05-03", media: 30.8, sessao: true },
          { data: "2025-05-04", media: 42.6, sessao: false },
          { data: "2025-05-05", media: 55.0, sessao: true },
          { data: "2025-05-06", media: 50.3, sessao: false },
          { data: "2025-05-07", media: 48.9, sessao: false },
          { data: "2025-05-08", media: 62.7, sessao: true },
          { data: "2025-05-09", media: 58.4, sessao: false },
          { data: "2025-05-10", media: 70.2, sessao: true },
          { data: "2025-05-11", media: 65.5, sessao: false },
          { data: "2025-05-12", media: 61.3, sessao: false },
          { data: "2025-05-13", media: 54.9, sessao: true },
          { data: "2025-05-14", media: 52.0, sessao: false },
          { data: "2025-05-15", media: 49.6, sessao: true },
        ]);
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
        setLastNegativeDate(data?.date || null);
      })
      .catch(() => setLastNegativeDate(null));
  }, [id]);

  const isLoading = !Array.isArray(registros) || registros.length === 0;

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
              insight?.latestClassificationDate
                ? `Alto (Negativo) em ${insight.latestClassificationDate}`
                : "Sem riscos negativos nos últimos 30 dias"
            }
            info="Exibe a data da última classificação negativa registrada para o paciente nos últimos 30 dias."
          />
        </div>
      </aside>

      <section className={styles.charts}>
        <h2 className={styles.sectionChartsTitle}>
          Análise de Risco - Visão Geral dos Gráficos
        </h2>

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
            <div className={styles.lineChart}>
              <LineChart registros={registros} isExpandable={true} />
            </div>

            <div className={styles.chartGroup}>
              <RiskEvolutionChart
                labels={["01/06", "05/06", "10/06", "15/06", "20/06", "25/06"]}
                data={[1.3, 1.5, 2.1, 2.6, 2.8, 3.0]}
              />

              <div className={styles.riskControlsContainer}>
                <RiskAverageChart
                  datasetsByPeriod={{
                    mes: {
                      labels: ["Abr", "Mai", "Jun"],
                      data: [1.8, 2.0, 2.4],
                      color: "#007bff",
                    },
                    semana: {
                      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
                      data: [1.6, 2.1, 2.3, 2.8],
                      color: "#6f42c1",
                    },
                    dia: {
                      labels: ["26/06", "27/06", "28/06", "29/06"],
                      data: [2.1, 2.5, 2.6, 3.0],
                      color: "#20c997",
                    },
                  }}
                />

                <RiskDistributionChart dataValues={[25, 40, 35]} />
              </div>
            </div>
          </>
        )}
      </section>
    </section>
  );
}
