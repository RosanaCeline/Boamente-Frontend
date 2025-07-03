import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./RiskDistributionChart.module.css";

export default function RiskDistributionChart({ dataValues }) {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Baixo (Positivo)", "Moderado (Neutro)", "Alto (Negativo)"],
        datasets: [{
          data: dataValues,
          backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribuição dos Níveis de Risco"
          }
        }
      }
    });

    return () => chart.destroy();
  }, [dataValues]);

  return <canvas ref={canvasRef} className={styles.chart}></canvas>;
}
