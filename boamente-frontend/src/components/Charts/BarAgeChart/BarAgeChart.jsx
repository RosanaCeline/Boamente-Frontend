import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip as ChartJSTooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';

import "../../../style.css";
import styles from "./BarAgeChart.module.css";
import { Tooltip } from "react-tooltip";
import { min } from "date-fns";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, ChartJSTooltip, Legend);

export default function BarAgeChart({ labels, dataValues, isExpandable = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef();
  const tooltipId = "bar-age-tooltip";

  const resolvedBlue = getComputedStyle(document.documentElement).getPropertyValue('--blue').trim();

  const data = {
    labels: labels,
    datasets: [{
      label: 'Quantidade de Pacientes',
      data: dataValues,
      backgroundColor: resolvedBlue,
      borderRadius: 6,
      barThickness: 40
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Faixa Etária',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Quantidade',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function(context) {
            return `Faixa etária de ${context[0].label}`;
          },
          label: (context) => `${context.dataset.label} : ${context.raw} pacientes`
        }
      },
      legend: { display: false },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 12 }
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const renderChart = () => (
    <Bar 
      data={data} 
      options={options} 
      className={styles.chart}
    />
  );

  if (!isExpandable) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>
            Distribuição de Pacientes por Faixa Etária
            <span
              data-tooltip-id={tooltipId}
              data-tooltip-html="Distribuição dos pacientes por faixa etária.<br/><br/>Mostra a quantidade de pacientes em cada grupo de idade."
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
                Nenhum paciente registrado nas faixas etárias
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.chartWrapper}>
            {renderChart()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Distribuição de Pacientes por Faixa Etária
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="Distribuição dos pacientes por faixa etária.<br/><br/>Mostra a quantidade de pacientes em cada grupo de idade."
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
              Nenhum paciente registrado nas faixas etárias
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            className={styles.chartWrapper}
            onClick={() => setIsExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIsExpanded(true)}
          >
            {renderChart()}
          </div>

          {isExpanded && (
            <div className={styles.barChartOverlay}>
              <div ref={modalRef} className={styles.barChartContent}>
                {renderChart()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}