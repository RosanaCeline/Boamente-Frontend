import React from 'react';
import style from './LabelInput.module.css';

export default function LabelInput({  id, name, type, placeholder, required, register, options, label, errors, showLabel = true, className = '' }) {
  let InputElement = null;

  if (type === "select") {
    InputElement = (
      <select
        id={id}
        name={name}
        required={required}
        className={`${style.formInputSelect} ${className}`}
        {...(register ? register(name, { required }) : {})}
      >
        <option value="">Selecione uma opção</option>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    InputElement = (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`${style.formInput} ${style.formTextarea} ${className}`}
        {...(register ? register(name, { required }) : {})}
      />
    );
  } else {
    InputElement = (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${style.formInput} ${className}`}
        {...(register ? register(name, { required }) : {})}
      />
    );
  }

  return (
    <div className={style.inputGroup}>
      {showLabel && (
        <label htmlFor={id} className={style.formLabel}>{label}</label>
      )}
      {InputElement}
      {errors?.[name] && (
        <span className={style.errorMessage}>{errors[name]?.message}</span>
      )}
    </div>
  );
}
