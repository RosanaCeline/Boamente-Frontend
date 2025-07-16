import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './CardGeneral.module.css'; 

import { ReactComponent as InfoIcon } from '../../../assets/icons/Info.svg';

export default function CardGeneral({ title, value, highlight, small, info }) {
  const tooltipId = `tooltip-${title.replace(/\s+/g, '-')}`;

  return (
    <div className={styles.card}>
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
      <p className={`${styles.value} ${highlight ? styles.highlight : ''}`}>
        {value}
      </p>
      {small && <div className={styles.small}>{small}</div>}
    </div>
  );
}
