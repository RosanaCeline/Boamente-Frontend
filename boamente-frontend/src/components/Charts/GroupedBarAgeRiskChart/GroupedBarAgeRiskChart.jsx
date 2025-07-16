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

import styles from "./GroupedBarAgeRiskChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GroupedBarAgeRiskChart({ labels, datasetsData }) {
  const data = {
    labels,
    datasets: datasetsData,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // permite flexibilidade no container
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
        title: {
          display: true,
          text: "Faixa Etária",
          font: { size: 18, },
        },
        stacked: false,
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