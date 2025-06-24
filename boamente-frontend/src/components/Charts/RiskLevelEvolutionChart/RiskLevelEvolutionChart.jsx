import React, { useState, useEffect, useRef } from "react";
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

export default function RiskLevelEvolutionChart({ dataSetsByPeriod }) {
  const [period, setPeriod] = useState("semana");
  const chartRef = useRef();

  // Monta os dados do gráfico baseado no período selecionado
  const data = {
    labels: dataSetsByPeriod[period].labels,
    datasets: [
      {
        label: "Baixo",
        data: dataSetsByPeriod[period].baixo,
        borderColor: "#0A5C32", // verde escuro
        backgroundColor: "rgba(10, 92, 50, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
      },
      {
        label: "Moderado",
        data: dataSetsByPeriod[period].moderado,
        borderColor: "#FFD95A", // amarelo
        backgroundColor: "rgba(255, 217, 90, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
      },
      {
        label: "Alto",
        data: dataSetsByPeriod[period].alto,
        borderColor: "#dc3545", // vermelho
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
        onChange={(e) => setPeriod(e.target.value)}
        aria-label="Selecionar período"
      >
        <option value="semana">Última Semana</option>
        <option value="mes">Último Mês</option>
        <option value="trimestre">Último Trimestre</option>
        <option value="ano">Último Ano</option>
      </select>

      <div className={styles.chartWrapper}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </section>
  );
}
