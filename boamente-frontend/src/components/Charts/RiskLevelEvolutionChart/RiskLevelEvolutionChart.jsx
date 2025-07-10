import React, { useState } from "react";
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

export default function RiskLevelEvolutionChart({ dataSetsByPeriod, onPeriodChange }) {
  const [period, setPeriod] = useState("semana");

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    if (onPeriodChange) onPeriodChange(newPeriod);
  };

  const safeData = dataSetsByPeriod?.[period] || {
    labels: [],
    Positive: [],
    Neutral: [],
    Negative: []
  };

  const data = {
    labels: safeData.labels,
    datasets: [
      {
        label: "Positivo",
        data: safeData.Positive || [],
        borderColor: "#0A5C32",
        backgroundColor: "rgba(10, 92, 50, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
      },
      {
        label: "Neutro",
        data: safeData.Neutral || [],
        borderColor: "#FFD95A",
        backgroundColor: "rgba(255, 217, 90, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
      },
      {
        label: "Negativo",
        data: safeData.Negative || [],
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.3,
        fill: true,
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
          font: { size: 18, },
        },
      },
      x: {
        title: {
          display: true,
          text: "Tempo",
          font: { size: 18, },
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
        onChange={handlePeriodChange}
        aria-label="Selecionar período"
      >
        <option value="semana">Última Semana</option>
        <option value="mes">Último Mês</option>
        <option value="trimestre">Último Trimestre</option>
        <option value="ano">Último Ano</option>
      </select>

      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}