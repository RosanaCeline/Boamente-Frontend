import React from "react";
import styles from "./InsightCard.module.css";

export default function InsightCard({ title, value }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
