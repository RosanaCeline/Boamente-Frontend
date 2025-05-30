import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

import "../../../style.css";
import styles from "./LineChart.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip, Legend);

export default function LineChart({ registros, isExpandable = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef();

  // Construindo as características do gráfico
  const data = {
    labels: registros.map((r) => r.data),
    datasets: [
      {
        label: "Ideação Suicida (%)",
        data: registros.map((r) => r.media),
        borderColor: "var(--blue)",
        backgroundColor: "var(--blue)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: registros.map((r) => (r.sessao ? "#0DA4AD" : "#CCC")),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "dd/MM/yyyy",
        },
        ticks: {
          callback: function (value, index) {
            const dataLabel = registros[index];
            return dataLabel && dataLabel.sessao ? dataLabel.data : "";
          },
        },
        title: {
          display: true,
          text: "Sessões feitas com o paciente",
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Percentual de Ideação Suicida (%)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `Data: ${context[0].label}`,
          label: (context) => `Média: ${context.formattedValue}%`,
        },
      },
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };


  // Comportamento de expansão do gráfico
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

  if (!isExpandable) {
    return (
      <div className={styles.LineChart}>
        <Line data={data} options={options} />
      </div>
    );
  }

  return (
    <>
      <div  className={styles.LineChart}
            onClick={() => setIsExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIsExpanded(true)}
      >
            <Line data={data} options={options} />
      </div>


      {isExpanded && (
        <div className={styles.LineChartOverlay}>
          <div ref={modalRef} className={styles.LineChartContent}>
            <Line data={data} options={options} />
          </div>
        </div>
      )}
    </>
  );
}
