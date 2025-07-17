import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import "../../../style.css";
import styles from "./PieSexChart.module.css";

ChartJS.register(ArcElement, ChartTooltip, Legend);

export default function PieSexChart({ dataValues }) {
  const tooltipId = "pie-sex-tooltip";
  const labels = ["Feminino", "Masculino", "Não declarado"];

  // Obtém cores CSS personalizadas
  const pink = getComputedStyle(document.documentElement).getPropertyValue('--pink').trim() || '#e83e8c';
  const blue = getComputedStyle(document.documentElement).getPropertyValue('--blue').trim() || '#007bff';
  const gray = getComputedStyle(document.documentElement).getPropertyValue('--gray').trim() || '#6c757d';

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [pink, blue, gray],
        borderWidth: 1,
        hoverOffset: 10,
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
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
        displayColors: true,
        usePointStyle: true,
        bodyFont: {
          size: 14,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { 
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Distribuição por Sexo
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="Distribuição dos pacientes por sexo."
            className={styles.infoIconWrapper}
          >
            <InfoIcon width={18} height={18} />
          </span>
        </h3>
      </div>

      <Tooltip id={tooltipId} place="top" className={styles.customTooltip} />

      {(!dataValues || dataValues.every(v => v === 0)) ? (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataContent}>
            <InfoIcon width={48} height={48} className={styles.noDataIcon} />
            <h4 className={styles.noDataTitle}>Dados Insuficientes</h4>
            <p className={styles.noDataMessage}>
              Nenhum paciente registrado nesta categoria
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
}