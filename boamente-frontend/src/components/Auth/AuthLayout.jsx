import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Undo2  } from 'lucide-react';
import * as yup from 'yup';
import styles from './AuthLayout.module.css';
import logoBoamente from '../../assets/images/homepage/logo-boamente-upscale-Ctitulo.png';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import LabelInput from '../LabelInput/LabelInput';
import Alert from '../Alert/Alert';

export default function AuthLayout({ title, subtitle, fields, links, onSubmit, buttonText, redirectOnSubmit, alertMessage, alertType, onCloseAlert }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  // Define o schema dinamicamente com base nos campos recebidos
  const validationSchema = yup.object().shape(
    fields.reduce((acc, field) => {
      switch (field.name) {
        case 'fullName':
          acc[field.name] = yup
            .string()
            .required('Nome é obrigatório.')
            .min(6, 'Nome deve ter no mínimo 6 caracteres.')
            .max(100, 'Nome deve ter no máximo 100 caracteres.');
          break;
        case 'email':
          acc[field.name] = yup
            .string()
            .required('E-mail é obrigatório.')
            .email('E-mail inválido.');
          break;
        case 'phoneNumber':
          acc[field.name] = yup
            .string()
            .required('Telefone é obrigatório.')
            .max(20, 'Telefone deve ter no máximo 20 caracteres.');
          break;
        case 'crpCrm':
          acc[field.name] = yup
            .string()
            .required('CRP/CRM é obrigatório.')
            .max(20, 'CRP/CRM deve ter no máximo 20 caracteres.');
          break;
        case 'uf':
          acc[field.name] = yup
            .string()
            .required('UF é obrigatória.')
            .matches(/^[A-Z]{2}$/, 'UF deve conter duas letras maiúsculas.');
          break;
        case 'password':
          acc[field.name] = yup
            .string()
            .required('Senha é obrigatória.');
          break;
        default:
          acc[field.name] = yup.string().required(`${field.label} é obrigatório.`);
      }
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const internalSubmit = (data) => {
    if (onSubmit) onSubmit(data);
    if (redirectOnSubmit) navigate(redirectOnSubmit);
  };

  // Lista dos campos que precisam de máscara, usar Controller para eles
  const fieldsWithMask = ['phoneNumber', 'cpf', 'cep'];

  return (
    <main className={styles.auth}>
      <div className={styles.authLogo}>
        <img src={logoBoamente} alt="Logo do Boamente" />
      </div>

      <section className={styles.authForm}>
        <span className={styles.goBack} onClick={handleGoBack} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleGoBack()}>
          <Undo2  size={20} style={{ marginRight: '0.5rem' }} />
          Voltar
        </span>
        <div className={styles.authFormTitles}>
          <h1>{title}</h1>
          {subtitle && <span>{subtitle}</span>}
        </div>

        {alertMessage && (
          <Alert 
            message={alertMessage} 
            type={alertType} 
            onClose={onCloseAlert} 
          />
        )}

        <form onSubmit={handleSubmit(internalSubmit)} noValidate>
          {fields.map(({ id, label, type, name, placeholder }) => {
            if (type === 'checkbox') {
              return (
                <div key={id} className={styles.checkboxField}>
                  <label>
                    <input
                      type="checkbox"
                      {...register(name)}
                    />
                    {label}
                  </label>
                </div>
              );
            }

            if (fieldsWithMask.includes(name)) {
              return (
                <Controller
                  key={id}
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <LabelInput
                      id={id}
                      label={label}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      register={null} // não usar register direto
                      errors={errors}
                      options={{
                        value: field.value || '',
                        onChange: field.onChange,
                        onBlur: field.onBlur,
                      }}
                    />
                  )}
                />
              );
            }

            // Campos normais usam register
            return (
              <LabelInput
                key={id}
                id={id}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                register={register}
                errors={errors}
              />
            );
          })}

          {links &&
            links.map(({ to, text, className, key }) => (
              <Link key={key} to={to} className={className || styles.link}>
                {text}
              </Link>
            ))}

          <ButtonSubmit type="submit">{buttonText}</ButtonSubmit>
        </form>
      </section>
    </main>
  );
}
