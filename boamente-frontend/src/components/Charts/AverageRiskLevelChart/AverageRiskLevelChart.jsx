import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import styles from "./AverageRiskLevelChart.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

export default function AverageRiskLevelChart({ weeklyData }) {
  const tooltipId = "risk-level-tooltip";

  console.log("weeklyData", weeklyData);

  const hasData = weeklyData && weeklyData.labels && weeklyData.data && weeklyData.data.length > 0;

  const labels = hasData ? weeklyData.labels : [];
  const medias = hasData ? weeklyData.data : [];

  const chartColors = {
    lightBlue: '#4D9CB9',
    lightBlueRgb: '77, 156, 185',
    gridColor: 'rgba(77, 156, 185, 0.1)'
  };

  const riskColors = {
    low: '#0A5C32',
    medium: '#E67E22',
    high: '#E74C3C'
  };


  const data = {
    labels,
    datasets: [
      {
        label: "Média do nível de risco",
        data: medias,
        borderColor: chartColors.lightBlue,
        backgroundColor: `rgba(${chartColors.lightBlueRgb}, 0.15)`,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value <= 1.3) return riskColors.low;
          if (value <= 2.3) return riskColors.medium;
          return riskColors.high;
        },
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
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
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: "Nível médio de risco",
          font: { 
            size: 16,
            weight: '500',
          },
        },
        grid: {
          color: chartColors.gridColor,
        },
      },
      x: {
        title: {
          display: true,
          text: "Últimos 7 dias",
          font: { 
            size: 16,
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Média: ${ctx.parsed.y.toFixed(2)}`
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
      legend: {
        display: false
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Evolução do Nível Médio de Risco
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="
              Média ponderada do nível de risco nos últimos 7 dias.<br/><br/>
              <strong>Interpretação:</strong><br/>
              • 1-1.3: Risco Baixo <span style='color:#0A5C32'>■</span><br/>
              • 1.4-2.3: Risco Moderado <span style='color:#E67E22'>■</span><br/>
              • 2.4-3: Risco Alto <span style='color:#E74C3C'>■</span><br/><br/>
              A linha mostra a tendência geral.
            "
            className={styles.infoIconWrapper}
          >
            <InfoIcon width={18} height={18} />
          </span>
        </h3>
      </div>

      <Tooltip id={tooltipId} place="top" className={styles.customTooltip} />

      {!hasData ? (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataContent}>
            <InfoIcon width={48} height={48} className={styles.noDataIcon} />
            <h4 className={styles.noDataTitle}>Dados Insuficientes</h4>
            <p className={styles.noDataMessage}>
              Nenhum dado de risco disponível para o período
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
}