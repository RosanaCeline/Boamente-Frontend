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
  
  const calcularMedia = (dado) => {
    const total = dado.baixo + dado.moderado + dado.alto;
    if (total === 0) return 0;
    const somaPesos = dado.baixo * 1 + dado.moderado * 2 + dado.alto * 3;
    return +(somaPesos / total).toFixed(2);
  };

  const hasData = weeklyData && weeklyData.length > 0 && weeklyData.some(d => 
    d.baixo > 0 || d.moderado > 0 || d.alto > 0
  );

  const labels = hasData ? weeklyData.map((dado) => dado.semana) : [];
  const medias = hasData ? weeklyData.map(calcularMedia) : [];

  // Cores baseadas no tema
  const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#dc3545';
  const fillColor = getComputedStyle(document.documentElement).getPropertyValue('--red-rgb').trim() || '220, 53, 69';

  const data = {
    labels,
    datasets: [
      {
        label: "Média do nível de risco",
        data: medias,
        borderColor: lineColor,
        backgroundColor: `rgba(${fillColor}, 0.3)`,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: lineColor,
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
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: "Período (Semanas)",
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
          label: (ctx) => {
            const weekData = weeklyData[ctx.dataIndex];
            const total = weekData.baixo + weekData.moderado + weekData.alto;
            return [
              `Média: ${ctx.parsed.y.toFixed(2)}`,
              `Baixo: ${weekData.baixo} (${total > 0 ? ((weekData.baixo/total)*100).toFixed(1) : 0}%)`,
              `Moderado: ${weekData.moderado} (${total > 0 ? ((weekData.moderado/total)*100).toFixed(1) : 0}%)`,
              `Alto: ${weekData.alto} (${total > 0 ? ((weekData.alto/total)*100).toFixed(1) : 0}%)`
            ];
          },
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
        position: "top",
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
          },
          padding: 20,
        },
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
            data-tooltip-html="Média ponderada do nível de risco por semana.<br/><br/>Escala:<br/>• 1.0 = Baixo risco<br/>• 2.0 = Moderado<br/>• 3.0 = Alto risco<br/><br/>A linha mostra a tendência geral."
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