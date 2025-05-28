import React from 'react';
import styles from './ButtonSubmit.module.css';

export default function ButtonSubmit({ type = 'button', onClick, children, className = '' }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
