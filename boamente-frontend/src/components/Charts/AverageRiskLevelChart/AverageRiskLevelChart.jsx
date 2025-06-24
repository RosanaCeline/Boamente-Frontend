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

import styles from "./AverageRiskLevelChart.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AverageRiskLevelChart({ weeklyData }) {
  // Função para calcular a média ponderada
  const calcularMedia = (dado) => {
    const total = dado.baixo + dado.moderado + dado.alto;
    if (total === 0) return 0;
    const somaPesos = dado.baixo * 1 + dado.moderado * 2 + dado.alto * 3;
    return +(somaPesos / total).toFixed(2);
  };

  const labels = weeklyData.map((dado) => dado.semana);
  const medias = weeklyData.map(calcularMedia);

  const data = {
    labels,
    datasets: [
      {
        label: "Média do nível (1=Baixo, 3=Alto)",
        data: medias,
        borderColor: "var(--btn-background)", // vermelho (ajustar conforme style.css)
        backgroundColor: "rgba(220, 53, 69, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 3,
        ticks: {
          stepSize: 0.5,
          callback: (value) => {
            if (value === 1) return "Baixo";
            if (value === 2) return "Moderado";
            if (value === 3) return "Alto";
            return value;
          },
        },
        title: {
          display: true,
          text: "Nível médio",
        },
      },
      x: {
        title: {
          display: true,
          text: "Período (Semanas)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Média: ${ctx.parsed.y}`,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section className={styles.chartSection}>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
