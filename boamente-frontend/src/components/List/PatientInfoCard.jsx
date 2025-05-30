import React from 'react';
import styles from './PatientInfoCard.module.css';
import "../../style.css"
import boamenteLogo from '../../assets/images/homepage/logo-boamente-upscale.png';

export default function PatientInfoCard({ patient }) {
  if (!patient) return null;

  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <img src={boamenteLogo} alt="Logo Boamente" className={styles.profileImage} />
      </div>

      <h2 className={styles.name}>{patient.nomePaciente}</h2>

      <div className={styles.infoGrid}>
        <div className={styles.infoBlock}>
          <span className={styles.label}>E-mail</span>
          <p className={styles.value}>{patient.emailPaciente}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Telefone</span>
          <p className={styles.value}>{patient.telefone || "Não informado"}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Sexo</span>
          <p className={styles.value}>
            {patient.sexo === "F" ? "Feminino" :
             patient.sexo === "M" ? "Masculino" : "Prefiro não declarar"}
          </p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Nascimento</span>
          <p className={styles.value}>{patient.nascimentoPaciente}</p>
        </div>
      </div>
    </div>
  );
}
