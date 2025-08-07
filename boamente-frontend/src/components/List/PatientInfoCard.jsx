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

      <h2 className={styles.name}>{patient.fullName}</h2>

      <div className={styles.infoGrid}>
        <div className={styles.infoBlock}>
          <span className={styles.label}>E-mail</span>
          <p className={styles.value}>{patient.email}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Telefone</span>
          <p className={styles.value}>{patient.phoneNumber || "Não informado"}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Sexo</span>
          <p className={styles.value}>{patient.gender}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Nascimento</span>
          <p className={styles.value}>{patient.birthDate}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Criado em</span>
          <p className={styles.value}>
            {patient.createdAt
              ? new Date(patient.createdAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Não informado"}
          </p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Arquivado em</span>
          <p className={styles.value}>
            {patient.archivedAt
              ? new Date(patient.archivedAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Não informado"}
          </p>
        </div>
      </div>
    </div>
  );
}

