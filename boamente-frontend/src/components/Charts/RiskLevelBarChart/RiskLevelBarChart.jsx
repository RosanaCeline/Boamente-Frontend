import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import styles from "./RiskLevelBarChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

export default function RiskLevelBarChart({ labels, dataValues }) {
  const tooltipId = "risk-level-bar-tooltip";
  
  // Get colors from CSS variables with fallbacks
  const green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#0A5C32';
  const yellow = getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim() || '#FFD95A';
  const red = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#dc3545';

  const hasData = dataValues && dataValues.some(value => value > 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pacientes",
        data: dataValues,
        backgroundColor: [green, yellow, red],
        borderRadius: 6,
        barThickness: 40,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }
    ]
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade de Pacientes",
          font: { 
            size: 16,
            weight: '500'
          },
          padding: { top: 20, bottom: 10 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        title: {
          display: true,
          text: "Nível de Risco",
          font: { 
            size: 16,
            weight: '500'
          },
          padding: { bottom: 20, top: 10 }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = dataValues.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((context.raw / total) * 100).toFixed(1) : 0;
            return `${context.dataset.label}: ${context.raw} (${percentage}%)`;
          }
        },
        displayColors: true,
        usePointStyle: true,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12
      },
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          boxWidth: 12,
          boxHeight: 12,
          padding: 20,
          font: {
            size: 14
          }
        }
      }
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Distribuição de Pacientes por Nível de Risco
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="Distribuição dos pacientes por nível de risco<br/><br/><strong>Legenda:</strong><br/>• Baixo <span style='color:#0A5C32'>■</span><br/>• Moderado <span style='color:#FFD95A'>■</span><br/>• Alto <span style='color:#dc3545'>■</span>"
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
              Nenhum paciente registrado nos níveis de risco
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
}