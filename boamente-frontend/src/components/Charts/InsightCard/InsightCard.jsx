import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styles from "./InsightCard.module.css";

import { ReactComponent as InfoIcon } from "../../../assets/icons/Info.svg";

export default function InsightCard({ title, value, info }) {
  const tooltipId = `tooltip-${title.replace(/\s+/g, '-')}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {title}
          {info && (
            <>
              <span
                data-tooltip-id={tooltipId}
                data-tooltip-content={info}
                className={styles.infoIconWrapper}
              >
                <InfoIcon />
              </span>
              <Tooltip id={tooltipId} place="top" />
            </>
          )}
        </h3>
      </div>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
