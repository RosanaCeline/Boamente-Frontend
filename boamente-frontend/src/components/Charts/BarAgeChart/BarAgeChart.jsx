import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "../../../style.css";
import styles from "./BarAgeChart.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BarAgeChart({ labels, dataValues, isExpandable = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef();

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
          text: 'Faixa Etária'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} pacientes`
        }
      },
      legend: { display: false }
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

  if (!isExpandable) {
    return (
      <div className={styles.barChart}>
        <Bar data={data} options={options} />
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.barChart}
        onClick={() => setIsExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsExpanded(true)}
      >
        <Bar data={data} options={options} />
      </div>

      {isExpanded && (
        <div className={styles.barChartOverlay}>
          <div ref={modalRef} className={styles.barChartContent}>
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </>
  );
}
