import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import logoBoamente from '../../assets/images/homepage/logo-boamente-upscale-Ctitulo.png';

export default function AuthLayout({ title, subtitle, fields, links, onSubmit,buttonText, redirectOnSubmit}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    fields.forEach(({ name }) => {
      formData[name] = e.target[name].value;
    });

    if (onSubmit) onSubmit(formData);
    if (redirectOnSubmit) navigate(redirectOnSubmit);
  };

  return (
    <main className={styles.auth}>
      <div className={styles.authLogo}>
        <img src={logoBoamente} alt="Logo do Boamente" />
      </div>

      <section className={styles.authForm}>
        <div className={styles.authFormTitles}>
          <h1>{title}</h1>
          {subtitle && <span>{subtitle}</span>} {/* Renderiza se haver o subtitle */}
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map(({ id, label, type, name, placeholder, pattern, title, required }) => (
            <React.Fragment key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                pattern={pattern}
                title={title}
                required={required}
              />
            </React.Fragment>
          ))}

          {links &&
            links.map(({ to, text, className, key }) => (
              <Link key={key} to={to} className={className || styles.link}>
                {text}
              </Link>
            ))}

          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
      </section>
    </main>
  );
}
