import React, { useState }from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import styles from "./RiskLevelEvolutionChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

export default function RiskLevelEvolutionChart({ dataSetsByPeriod }) {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const currentData = dataSetsByPeriod?.[selectedPeriod] || {};
  const labels = currentData?.labels || [];
  const lowData = currentData?.positives || [];
  const mediumData = currentData?.neutrals || [];
  const highData = currentData?.negatives || [];

  const periodColors = {
    daily: '#4E79A7', 
    weekly: '#F28E2B',
    monthly: '#59A14F',
    quarterly: '#9C755F',
    yearly: '#BAB0AC'
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Baixo",
        data: lowData,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.6)",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: "Moderado",
        data: mediumData,
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: "Alto",
        data: highData,
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.6)",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Tempo",
          font: { size: 18 },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade de Pacientes",
          font: { size: 18 },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Quantidade de Pacientes por Nível de Risco ao Longo do Tempo
          <span
            data-tooltip-id="tooltip-risk-evolution"
            data-tooltip-html="
              Este gráfico mostra a quantidade de pacientes classificados em risco baixo, moderado ou alto ao longo do tempo.<br/><br/>
              • <span style='color:#28a745'>■</span> Risco Baixo: Média entre 1 e 1.3<br/>
              • <span style='color:#ffc107'>■</span> Risco Moderado: Média entre 1.4 e 2.3<br/>
              • <span style='color:#dc3545'>■</span> Risco Alto: Média entre 2.4 e 3<br/><br/>
              Cada barra representa um período (ex: dia, semana, mês), e sua altura indica o total de pacientes com alguma classificação naquele período.
            "
            className={styles.infoIconWrapper}
          >
            <InfoIcon width={18} height={18} />
          </span>
        </h3>
      </div>

      <Tooltip id="tooltip-risk-evolution" place="top" className={styles.customTooltip} />

      <div className={styles.controls}>
        <label htmlFor="period-select" className={styles.periodLabel}>
          <strong>Selecionar Período:</strong>
        </label>
        <select
          id="period-select"
          className={styles.periodSelect}
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{
            backgroundColor: `${periodColors[selectedPeriod]}20`,
            borderColor: periodColors[selectedPeriod]
          }}
        >
          <option value="daily">Últimos 7 dias</option>
          <option value="weekly">Últimas 4 semanas</option>
          <option value="monthly">Últimos 3 meses</option>
          <option value="quarterly">Últimos 4 trimestres</option>
          <option value="yearly">Últimos 5 anos</option>
        </select>
      </div>

      {labels.length === 0 || (!lowData.some(v => v > 0) && !mediumData.some(v => v > 0) && !highData.some(v => v > 0)) ? (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataContent}>
            <InfoIcon width={48} height={48} className={styles.noDataIcon} />
            <h4 className={styles.noDataTitle}>Dados Insuficientes</h4>
            <p className={styles.noDataMessage}>
              Nenhuma classificação registrada para este período
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <Bar data={data} options={options} className={styles.chart}/>
        </div>
      )}
    </div>
  );
}