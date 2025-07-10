import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./RiskLevelBarChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RiskLevelBarChart({ labels, dataValues }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quantidade de Pacientes",
        data: dataValues,
        backgroundColor: ["#0A5C32", "#FFD95A", "#dc3545"], // Verde, Amarelo, Vermelho
        borderRadius: 6,
        barThickness: 30
      }
    ]
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade",
          font: { size: 18, },
        }
      },
      y: {
        title: {
          display: true,
          text: "Nível de Risco",
          font: { size: 18, },
        }
      }
    },
    plugins: {
      legend: {
        display: true,   
        position: 'top',    
        align: 'start',   
        font: { size: 18, },
        labels: {
          boxWidth: 15,   
          padding: 15,
        }
      }

    }
  };

  return (
    <div className={styles.RiskLevelBarChart}>
      <Bar data={data} options={options} />
    </div>
  );
}
