import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import styles from "./RiskEvolutionChart.module.css";

export default function RiskEvolutionChart({ labels, data }) {
  const canvasRef = useRef(null);
  const tooltipId = "tooltip-risk-evolution-24h";
  const chartRef = useRef(null);

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

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const hasData = data && data.some(value => value > 0);
    if (!hasData) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Nível de Risco",
          data,
          borderColor: chartColors.lightBlue,
          backgroundColor: `rgba(${chartColors.lightBlueRgb}, 0.15)`,
          borderWidth: 2,
          pointBackgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            if (value <= 1.3) return riskColors.low;
            if (value <= 2.3) return riskColors.medium;
            return riskColors.high;
          },
          pointBorderColor: '#FFF',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: true,
            usePointStyle: true,
            boxPadding: 6,
            callbacks: {
              title: (context) => `Período: ${context[0].label}`,
              label: (context) => {
                const value = context.raw;
                let riskLevel = "";
                
                if (value <= 1.3) riskLevel = "Baixo";
                else if (value <= 2.3) riskLevel = "Moderado";
                else riskLevel = "Alto";
                
                return [
                  `Nível: ${riskLevel}`,
                  `Valor: ${value.toFixed(2)}`
                ];
              },
              labelColor: (context) => {
                const value = context.dataset.data[context.dataIndex];
                let color = riskColors.high;
                
                if (value <= 1.3) color = riskColors.low;
                else if (value <= 2.3) color = riskColors.medium;
                
                return {
                  borderColor: color,
                  backgroundColor: color
                };
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 12 }
          }
        },
        scales: {
          y: {
            min: 0.5,
            max: 3.5,
            ticks: {
              stepSize: 1,
              precision: 0,
              callback: function(value) {
                const riskLevels = {
                  1: "Baixo",
                  2: "Moderado", 
                  3: "Alto"
                };
                return Number.isInteger(value) ? riskLevels[value] : '';
              },
              major: {
                enabled: true
              }
            },
            grid: {
              color: chartColors.gridColor,
              drawTicks: true
            },
            title: {
              display: true,
              text: "Nível de Risco",
              font: {
                weight: 'bold'
              }
            },
            afterBuildTicks: function(axis) {
              axis.ticks = [1, 2, 3].map(v => ({ value: v }));
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: "Períodos das últimas 24 horas",
              font: {
                weight: 'bold'
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, data]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Variação do Nível de Risco nas últimas 24 horas
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="
            Este gráfico mostra a variação do nível de risco nas últimas 24 horas.<br/><br/>
            <strong>Interpretação:</strong><br/>
            • 1-1.3: Risco Baixo <span style='color:#0A5C32'>■</span><br/>
            • 1.4-2.3: Risco Moderado <span style='color:#E67E22'>■</span><br/>
            • 2.4-3: Risco Alto <span style='color:#E74C3C'>■</span>"
            className={styles.infoIconWrapper}
          >
            <InfoIcon width={18} height={18} />
          </span>
        </h3>
      </div>

      <Tooltip id={tooltipId} place="top" className={styles.customTooltip} />

      {(!data || data.every(v => v === 0)) ? (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataContent}>
            <InfoIcon width={48} height={48} className={styles.noDataIcon} />
            <h4 className={styles.noDataTitle}>Dados Insuficientes</h4>
            <p className={styles.noDataMessage}>
              Nenhuma classificação registrada nas últimas 24 horas
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