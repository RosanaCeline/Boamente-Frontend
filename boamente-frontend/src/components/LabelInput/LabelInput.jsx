import React, { useState, useEffect } from 'react';
import style from './LabelInput.module.css';

export default function LabelInput({
  id,
  name,
  type,
  placeholder,
  required,
  register,
  options,
  label,
  errors,
  showLabel = true,
  className = ''
}) {
  const [valor, setValor] = useState(options?.value || '');

  useEffect(() => {
    if (options?.value !== undefined && options.value !== valor) {
      setValor(options.value);
    }
  }, [options?.value, valor]);

  const formatarTelefone = (valorAtual, valorAnterior) => {
    if (!valorAtual) return '';
    const soNumeros = valorAtual.replace(/\D/g, '');
    const estaApagando = valorAtual.length < valorAnterior.length;
    if (estaApagando) return valorAtual;
    let v = soNumeros.slice(0, 11);
    if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    return v.replace(/^(\d*)/, '($1');
  };

  const formatarCPF = (value) => {
    if (!value) return '';
    let v = value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  };

  const validarSomenteLetras = (value) => {
    if (!value) return '';
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  };

  const formatarUF = (valorAtual, valorAnterior) => {
    if (!valorAtual) return '';
    const soLetras = valorAtual.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const estaApagando = valorAtual.length < valorAnterior.length;
    if (estaApagando) return valorAtual.toUpperCase().slice(0, 2);
    return soLetras.slice(0, 2);
  };

  const handleChange = (e) => {
    const valAnterior = valor;
    let val = e.target.value;

    if (name === 'phoneNumber') {
      val = formatarTelefone(val, valAnterior);
      setValor(val);
    } else if (name === 'cpf') {
      val = formatarCPF(val);
      setValor(val);
    } else if (name === 'fullName') {
      val = validarSomenteLetras(val);
      setValor(val);
    } else if (name === 'uf') {
      val = formatarUF(val, valAnterior);
      setValor(val);
    } else {
      // Outros campos sem máscara
      if (options?.onChange) {
        options.onChange(e);
      }
      return;
    }

    if (options?.onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          value: val,
          name,
          id
        }
      };
      options.onChange(event);
    }
  };

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
    if (register) {
      InputElement = (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`${style.formInput} ${className}`}
          {...register(name, { required })}
          onChange={handleChange}
          value={['phoneNumber', 'cpf', 'fullName', 'uf'].includes(name) ? valor : undefined}
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
          value={options?.value || ''}
          onChange={handleChange}
          readOnly={options?.readOnly}
        />
      );
    }
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
