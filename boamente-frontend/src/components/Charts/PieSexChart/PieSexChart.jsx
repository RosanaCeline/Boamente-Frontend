import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../../style.css";
import styles from "./PieSexChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieSexChart({ dataValues }) {
  const labels = ["Feminino", "Masculino", "Não declarado"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#e83e8c", // rosa para Feminino
          "#007bff", // azul para Masculino
          "#6c757d", // cinza para Não declarado
        ],
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = context.raw;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 18, },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.PieSexChart}>
      <Pie data={data} options={options} />
    </div>
  );
}
