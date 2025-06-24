import React from 'react';
import styles from './CardGeneral.module.css'; 

export default function CardGeneral ({ title, value, highlight, small }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={`${styles.value} ${highlight ? styles.highlight : ''}`}> {value} </p>
      {small && <div className={styles.small}>{small}</div>}
    </div>
  );
}