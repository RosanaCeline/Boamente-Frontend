import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import styles from './Alert.module.css';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const labels = {
    error: 'Erro',
    success: 'Sucesso',
  };

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span className={styles.icon}>
        {type === 'error' ? <AlertCircle size={20} color="#ff6600" /> : <CheckCircle size={20} color="#00c851" />}
      </span>
      <span className={styles.message}>
        <strong>{labels[type]}</strong>
        <br />
        {message}
      </span>
      <span className={styles.closeBtn} onClick={onClose}>×</span>
    </div>
  );
};

export default Alert;
