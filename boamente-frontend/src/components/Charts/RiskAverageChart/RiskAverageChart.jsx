import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';
import { fetchPatientRiskAverage } from "../../../services/dashboardService";
import styles from "./RiskAverageChart.module.css";

export default function RiskAverageChart({ patientId }) {
  const canvasRef = useRef(null);
  const tooltipId = "tooltip-risk-average";
  const chartRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("dia");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    mes: { labels: [], data: [] },
    semana: { labels: [], data: [] },
    dia: { labels: [], data: [] }
  });

  const hasValidData = (data) => {
    return data && data.some(value => value > 0);
  };

  // Paleta de cores
  const periodColors = {
    mes: '#4E79A7',    // Azul
    semana: '#F28E2B', // Laranja
    dia: '#59A14F'     // Verde
  };

  // Busca os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPatientRiskAverage(patientId);
        
        setChartData({
          mes: {
            labels: data.monthly.labels || [],
            data: data.monthly.data || []
          },
          semana: {
            labels: data.weekly.labels || [],
            data: data.weekly.data || []
          },
          dia: {
            labels: data.daily.labels || [],
            data: data.daily.data || []
          }
        });
        
      } catch (err) {
        console.error('Erro ao buscar médias de risco:', err);
        setError('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  // Configura e renderiza o gráfico
  useEffect(() => {
    if (!canvasRef.current) return;
    if (isLoading || error) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const currentData = chartData[selectedPeriod];
    if (!currentData?.labels?.length) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    try {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: currentData.labels,
          datasets: [{
            label: "Média do Score",
            data: currentData.data,
            backgroundColor: periodColors[selectedPeriod],
            borderColor: '#FFF',
            borderWidth: 1,
            borderRadius: 4,
            hoverBackgroundColor: `${periodColors[selectedPeriod]}CC`
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
              callbacks: {
                title: function(context) {
                  return context[0].label.replace(/\n/g, " - ");
                },
                label: (context) => {
                  const value = context.raw;
                  let riskLevel = "";
                  if (value <= 1.3) riskLevel = "Baixo";
                  else if (value < 2.4) riskLevel = "Moderado";
                  else riskLevel = "Alto";
                  
                  return [
                    `Nível: ${riskLevel}`,
                    `Média: ${value.toFixed(2)}`,
                    `Período: ${selectedPeriod === 'mes' ? 'Mensal' : selectedPeriod === 'semana' ? 'Semanal' : 'Diário'}`
                  ];
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
              max: 3,
              ticks: {
                stepSize: 0.5,
                callback: (value) => {
                  if (value === 0.5) return "";
                  if (value === 1) return "1 - Baixo";
                  if (value === 2) return "2 - Moderado";
                  if (value === 3) return "3 - Alto";
                  return value;
                }
              },
              title: {
                display: true,
                text: "Nível de Risco",
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              ticks: {
                padding: 10,
                font: {
                  size: 12
                },
                callback: function(value) {
                  const label = this.getLabelForValue(value);
                  return label.split('\n');
                }
              },
              title: {
                display: true,
                text: "Período",
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    } catch (err) {
      console.error("Erro ao criar gráfico:", err);
      setError("Erro ao renderizar gráfico");
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedPeriod, chartData, isLoading, error]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          Média de Risco por Período
          <span
            data-tooltip-id={tooltipId}
            data-tooltip-html="
              Este gráfico mostra a média do nível de risco em diferentes períodos.<br/><br/>
              <strong>Cores:</strong><br/>
              • Diário <span style='color:#59A14F'>■</span><br/>
              • Semanal <span style='color:#F28E2B'>■</span><br/>
              • Mensal <span style='color:#4E79A7'>■</span><br/><br/>
              <strong>Interpretação:</strong><br/>
              • 1-1.3: Risco Baixo <br/>
              • 1.4-2.3: Risco Moderado<br/>
              • 2.4-3: Risco Alto"
            className={styles.infoIconWrapper}
          >
            <InfoIcon width={18} height={18} />
          </span>
        </h3>
      </div>

      <Tooltip id={tooltipId} place="top" className={styles.customTooltip} />

      <div className={styles.controls}>
        <label htmlFor="period-select" className={styles.periodLabel}>
          <strong>Selecionar Período:</strong>
        </label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className={styles.periodSelect}
          style={{
            backgroundColor: `${periodColors[selectedPeriod]}20`,
            borderColor: periodColors[selectedPeriod]
          }}
        >
          <option value="dia">Últimos 7 dias</option>
          <option value="semana">Últimas 4 semanas</option>
          <option value="mes">Últimos 3 meses</option>
        </select>
      </div>

      {!hasValidData(chartData[selectedPeriod]?.data) ? (
        <div className={styles.noDataContainer}>
          <div className={styles.noDataContent}>
            <InfoIcon width={48} height={48} className={styles.noDataIcon} />
            <h4 className={styles.noDataTitle}>Dados Insuficientes</h4>
            <p className={styles.noDataMessage}>
              Nenhuma classificação registrada para este período
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          <canvas 
            key={`canvas-${selectedPeriod}`}
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