import React from 'react';
import style from './LabelInput.module.css';

export default function LabelInput({ id, name, type, placeholder, required, register, options, label, errors }) {
  if (type === "select") {
    return (
      <div className={style.inputGroup}>
        <label htmlFor={id} className={style.formLabel}>{label}</label>
        <select
          id={id}
          name={name}
          required={required}
          className={style.formInputSelect}
          {...(register ? register(name, { required }) : {})}
        >
          <option value="">Selecione uma opção</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && <span className={style.errorMessage}>{errors[name]?.message}</span>}
      </div>
    );
  }

  return (
    <div className={style.inputGroup}>
      <label htmlFor={id} className={style.formLabel}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={style.formInput}
        {...(register ? register(name, { required }) : {})}
      />
      {errors[name] && <span className={style.errorMessage}>{errors[name]?.message}</span>}
    </div>
  );
}
