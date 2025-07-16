import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import styles from "./GroupedBarSexRiskChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GroupedBarSexRiskChart({ labels, datasetsData }) {
  const data = {
    labels,
    datasets: datasetsData,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: "Sexo",
          font: { size: 18, },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade de Pacientes",
          font: { size: 18, },
        },
        stacked: false,
      },
    },
  };

  return (
    <section className={styles.chartSection}>
      <div className={styles.chartWrapper}>
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}