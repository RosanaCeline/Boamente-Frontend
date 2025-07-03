import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./RiskEvolutionChart.module.css";

export default function RiskEvolutionChart({ labels, data }) {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Score de Risco",
          data,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Evolução do Score de Risco"
          }
        },
        scales: {
          y: {
            min: 1,
            max: 3,
            title: {
              display: true,
              text: "Score (1=Baixo, 2=Moderado, 3=Alto)"
            }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [labels, data]);

  return <canvas ref={canvasRef} className={styles.chart}></canvas>;
}
