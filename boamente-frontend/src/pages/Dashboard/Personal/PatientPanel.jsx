import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./PatientPanel.module.css";
import LogoBoamente from "../../../assets/images/homepage/logo-boamente-upscale.png";
import "../../../style.css"
import LineChart from "../../../components/Charts/LineChart/LineChart";
import PatientInfoCard from "../../../components/List/PatientInfoCard";

export default function PatientPanel() {
  const { id } = useParams();
  const [registros, setRegistros] = useState(null); 
  const [erro, setErro] = useState(null); 

  // Simulação de dados do paciente
  const paciente = {
    nomePaciente: "Laís Coutinho",
    emailPaciente: "lais@email.com",
    telefone: "(85) 99999-9999",
    sexo: "F",
    nascimentoPaciente: "1998-07-15",
  };

  useEffect(() => {
    setTimeout(() => {
      try {
        setRegistros([
          // Simulação de dados de ideação suicida
          { data: "2025-05-01", media: 45.2, sessao: true },
          { data: "2025-05-02", media: 60.1, sessao: false },
          { data: "2025-05-03", media: 30.8, sessao: true },
          { data: "2025-05-04", media: 42.6, sessao: false },
          { data: "2025-05-05", media: 55.0, sessao: true },
          { data: "2025-05-06", media: 50.3, sessao: false },
          { data: "2025-05-07", media: 48.9, sessao: false },
          { data: "2025-05-08", media: 62.7, sessao: true },
          { data: "2025-05-09", media: 58.4, sessao: false },
          { data: "2025-05-10", media: 70.2, sessao: true },
          { data: "2025-05-11", media: 65.5, sessao: false },
          { data: "2025-05-12", media: 61.3, sessao: false },
          { data: "2025-05-13", media: 54.9, sessao: true },
          { data: "2025-05-14", media: 52.0, sessao: false },
          { data: "2025-05-15", media: 49.6, sessao: true }
        ]);
      } catch (err) {
        setErro("Erro ao carregar dados do paciente.");
      }
    }, 2000);
  }, [id]);

  return (
    <section className={styles.sectionPersonal}>
      <aside className={styles.patientInformation}>
        <PatientInfoCard patient={paciente} />
      </aside>
      <section className={styles.charts}>
        <div className={styles.anotherInformation}>
          <h2>Esse espaço esta destinado para incluir algum botao, como alguma funcionalidade, ou algum card com informações, tipo a taxa de Ideação entre uma sessão e outra, ou so nos ultimos 7 dias.</h2>
        </div>
        <div className={styles.lineChart}>
          {erro ? (
            <p>{erro}</p>
          ) : !Array.isArray(registros) || registros.length === 0 ? (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinnerBackground}>
                <img src={LogoBoamente} alt="Logo do Boamente" className={styles.fixedImage} />
                <div className={styles.spinner}></div>
              </div>
              <p className={styles.spinnerText}>Carregando dados do paciente...</p>
            </div>
          ) : (
            <LineChart registros={registros} isExpandable={true} />
          )}
        </div>
      </section>
    </section>
  );
}
