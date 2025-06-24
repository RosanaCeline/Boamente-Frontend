import React from "react";
import "../../../style.css"
import styles from "./DashboardGeneral.module.css"; 
import CardGeneral from "../../../components/Charts/Card/CardGeneral";
import BarAgeChart from "../../../components/Charts/BarAgeChart/BarAgeChart";
import PieSexChart from "../../../components/Charts/PieSexChart/PieSexChart";
import RiskLevelBarChart from "../../../components/Charts/RiskLevelBarChart/RiskLevelBarChart";
import RiskLevelEvolutionChart from "../../../components/Charts/RiskLevelEvolutionChart/RiskLevelEvolutionChart";
import AverageRiskLevelChart from "../../../components/Charts/AverageRiskLevelChart/AverageRiskLevelChart";
import GroupedBarAgeRiskChart from "../../../components/Charts/GroupedBarAgeRiskChart/GroupedBarAgeRiskChart";
import GroupedBarSexRiskChart from "../../../components/Charts/GroupedBarSexRiskChart/GroupedBarSexRiskChart"

const data = [
  { title: 'Total de Pacientes Ativos', value: '132' },
  { title: 'Insight Automático', value: '+15% de risco alto', highlight: true, small: 'em relação à última semana' },
  { title: 'Novos Casos de Risco Elevado', value: '8', small: 'no último mês' },
  { title: 'Piora no Nível de Risco', value: '5 pacientes', highlight: true, small: '= 3,8% do total' },
];

const ageLabels = ['< 18', '18-25', '26-35', '36-45', '46-60', '> 60'];
const ageData = [5, 20, 35, 18, 12, 6]; 

const sexData = [52, 38, 10]; // feminino, masculino, não declarado

const riskLabels = ['Baixo', 'Moderado', 'Alto'];
const riskData = [30, 15, 7];

const datasetsByPeriod = {
  semana: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    baixo: [2, 3, 4, 3, 5, 4, 4],
    moderado: [1, 2, 2, 2, 3, 2, 2],
    alto: [0, 1, 1, 0, 1, 1, 1],
  },
  mes: {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    baixo: [12, 15, 14, 16],
    moderado: [6, 8, 7, 9],
    alto: [2, 3, 2, 4],
  },
  trimestre: {
    labels: ["Jan", "Fev", "Mar"],
    baixo: [45, 48, 50],
    moderado: [20, 22, 23],
    alto: [6, 7, 9],
  },
  ano: {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    baixo: [50, 52, 48, 53, 55, 57, 56, 60, 62, 65, 67, 70],
    moderado: [20, 22, 21, 23, 24, 25, 27, 26, 28, 30, 31, 32],
    alto: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11],
  },
};

const weeklyData = [
  { semana: "Semana 1", baixo: 15, moderado: 5, alto: 2 },
  { semana: "Semana 2", baixo: 13, moderado: 7, alto: 4 },
  { semana: "Semana 3", baixo: 10, moderado: 10, alto: 5 },
  { semana: "Semana 4", baixo: 8, moderado: 12, alto: 5 },
  { semana: "Semana 5", baixo: 7, moderado: 10, alto: 8 },
  { semana: "Semana 6", baixo: 5, moderado: 10, alto: 10 },
];

const datasetsData = [
  {
    label: "Baixo",
    data: [4, 10, 12, 8, 6, 3],
    backgroundColor: "#28a745", // verde
  },
  {
    label: "Moderado",
    data: [2, 6, 9, 6, 5, 4],
    backgroundColor: "#ffc107", // amarelo
  },
  {
    label: "Alto",
    data: [1, 3, 5, 4, 4, 2],
    backgroundColor: "#dc3545", // vermelho
  },
];

const sexLabels = ['Masculino', 'Feminino', 'Não declarado'];

const sexDatasetsData = [
  {
    label: "Baixo",
    data: [12, 18, 5],
    backgroundColor: "#28a745", // verde
  },
  {
    label: "Moderado",
    data: [7, 10, 3],
    backgroundColor: "#ffc107", // amarelo
  },
  {
    label: "Alto",
    data: [5, 4, 2],
    backgroundColor: "#dc3545", // vermelho
  },
];



export default function DashboardGeneral () {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard Geral - Indicadores</h2>
      <div className={styles.gridIndicators}>
        {data.map((item, index) => (
          <CardGeneral
            key={index}
            title={item.title}
            value={item.value}
            highlight={item.highlight}
            small={item.small}
          />
        ))}
      </div>

      {/* Grade para os gráficos lado a lado */}
      <div className={styles.gridCharts}>
        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Faixa Etária</h2>
          <BarAgeChart labels={ageLabels} dataValues={ageData} />
        </section>
        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Sexo</h2>
          <PieSexChart dataValues={sexData} />
        </section>

        <section>
          <h2 className={styles.heading}>Evolução de Níveis de Ideação Suicida ao Longo do Tempo</h2>
          <RiskLevelEvolutionChart dataSetsByPeriod={datasetsByPeriod} />
        </section>
        <section>
          <h2 className={styles.heading}>Média Geral do Nível de Ideação Suicida (Últimas Semanas)</h2>
          <AverageRiskLevelChart weeklyData={weeklyData} />
        </section>

        <section>
          <h2 className={styles.heading}>Distribuição de Pacientes por Nível de Risco</h2>
          <RiskLevelBarChart labels={riskLabels} dataValues={riskData} />
        </section>
        <section>
          <h2 className={styles.heading}>Comparação de Níveis de Ideação Suicida por Faixa Etária</h2>
          <GroupedBarAgeRiskChart labels={ageLabels} datasetsData={datasetsData} />
        </section>
        <section>
          <h2 className={styles.heading}>Comparação de Níveis de Ideação Suicida por Sexo</h2>
          <GroupedBarSexRiskChart labels={sexLabels} datasetsData={sexDatasetsData} />
        </section>
      </div>
  </div>

  );
}