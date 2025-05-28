import React from 'react';
import style from './LabelInput.module.css';

export default function LabelInput({ id, name, type, placeholder, required, register, options }) {
  if (type === "select") {
    return (
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
    );
  }

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className={style.formInput}
      {...(register ? register(name, { required }) : {})}
    />
  );
}
