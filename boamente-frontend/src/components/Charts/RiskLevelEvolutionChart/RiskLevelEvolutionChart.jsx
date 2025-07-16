import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./RiskLevelEvolutionChart.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function RiskLevelEvolutionChart({ dataSetsByPeriod, selectedPeriod, onPeriodChange }) {
  const period = selectedPeriod;

  console.log("Periodo? ", period);
  console.log("Dados recebidos: ", dataSetsByPeriod);

  const rawData = dataSetsByPeriod || {
    labels: [],
    Positive: [],
    Neutral: [],
    Negative: []
  };

  const labels = dataSetsByPeriod.labels;
  const lowData = dataSetsByPeriod.Positive;
  const mediumData = dataSetsByPeriod.Neutral;
  const highData = dataSetsByPeriod.Negative;

  const data = {
    labels,
    datasets: [
      {
        label: "Baixo",
        data: lowData,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: "Moderado",
        data: mediumData,
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: "Alto",
        data: highData,
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.1)",
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
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade de Pacientes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tempo",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className={styles.chartSection}>
      <select
        className={styles.periodSelect}
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        aria-label="Selecionar período"
      >
        <option value="WEEKLY">Última Semana</option>
        <option value="MONTHLY">Último Mês</option>
        <option value="QUARTERLY">Último Trimestre</option>
        <option value="YEARLY">Último Ano</option>
      </select>

      <div className={styles.chartWrapper} style={{ height: 400 }}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}