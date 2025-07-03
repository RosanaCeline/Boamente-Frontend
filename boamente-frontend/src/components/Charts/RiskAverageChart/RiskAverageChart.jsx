import React, { useEffect, useRef, useState, useCallback } from "react";
import Chart from "chart.js/auto";
import styles from "./RiskAverageChart.module.css";

export default function RiskAverageChart({ datasetsByPeriod }) {
  const canvasRef = useRef();
  const chartInstance = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("mes");

  const renderChart = useCallback((period) => {
    const ctx = canvasRef.current.getContext("2d");
    const { labels, data, color } = datasetsByPeriod[period];

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Média do Score",
          data,
          backgroundColor: color
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Média de Risco por ${period.charAt(0).toUpperCase() + period.slice(1)}`
          }
        },
        scales: {
          y: {
            min: 1,
            max: 3
          }
        }
      }
    });
  }, [datasetsByPeriod]);

  useEffect(() => {
    renderChart(selectedPeriod);
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [selectedPeriod, renderChart]);

  return (
    <div className={styles.container}>
      <label htmlFor="period-select"><strong>Selecionar Período:</strong></label>
      <select
        id="period-select"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="mes">Por Mês</option>
        <option value="semana">Por Semana</option>
        <option value="dia">Por Dia</option>
      </select>
      <canvas ref={canvasRef} className={styles.chart}></canvas>
    </div>
  );
}
