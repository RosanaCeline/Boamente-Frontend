import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import styles from "./RiskDistributionChart.module.css";

export default function RiskDistributionChart({ dataValues }) {
  const canvasRef = useRef(null); // Inicialize como null
  const tooltipId = "tooltip-risk-distribution";
  const chartRef = useRef(null);

  // Paleta de cores
  const riskColors = {
    low: '#66BB6A',
    medium: '#FFEE58',
    high: '#EF5350'
  };

  useEffect(() => {
    // Verifique se o canvas existe e se há dados válidos
    if (!canvasRef.current || !dataValues || dataValues.every(v => v === 0)) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Destrua o gráfico anterior se existir
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crie o novo gráfico
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Baixo (Positivo)", "Moderado (Neutro)", "Alto (Negativo)"],
        datasets: [{
          data: dataValues,
          backgroundColor: [
            riskColors.low, 
            riskColors.medium, 
            riskColors.high
          ],
          borderColor: '#FFF',
          borderWidth: 2,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12
              },
              color: '#333'
            }
          },
          tooltip: {
            displayColors: true,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            titleFont: { 
              size: 14,
              family: "'Segoe UI', Roboto, sans-serif"
            },
            bodyFont: { 
              size: 12,
              family: "'Segoe UI', Roboto, sans-serif" 
            },
            boxPadding: 6
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dataValues]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Distribuição de Classificações por Nível de Risco
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="Distribuição das classificações de risco do paciente nos últimos 30 dias.<br/><br/><strong>Legenda:</strong><br/>• Baixo <span style='color:#66BB6A'>■</span><br/>• Moderado <span style='color:#FFEE58'>■</span><br/>• Alto <span style='color:#EF5350'>■</span>"
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
              Nenhuma classificação registrada nos últimos 30 dias
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <canvas 
            ref={canvasRef} 
            className={styles.chart}
            width="400"
            height="400"
          />
        </div>
      )}
    </div>
  );
}