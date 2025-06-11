import React from "react";
import style from "./GenericForm.module.css";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import LabelInput from "../LabelInput/LabelInput";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export default function GenericForm ({ sections = [], footerMessage, buttonLabel = "Enviar", onSubmit }) {

    // Define o schema dinamicamente com base nos campos recebidos
    const allFields = sections.flatMap(section => section.fields);

    const validationSchema = yup.object().shape(
        allFields.reduce((acc, field) => {
          switch (field.name) {
            case 'fullName':
              acc[field.name] = yup
                .string()
                .required('Nome é obrigatório.')
                .min(6, 'Nome deve ter no mínimo 6 caracteres.')
                .max(100, 'Nome deve ter no máximo 100 caracteres.');
              break;
            case 'cpf':
              acc[field.name] = yup
                .string()
                .required('CPF é obrigatório.')
                .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00.')
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
                .matches(/^\d{10,20}$/, 'Telefone deve conter entre 10 e 20 dígitos numéricos.');
              break;
            case 'gender':
              acc[field.name] = yup
                .string()
                .oneOf(['F', 'M', 'ND'], 'Sexo inválido.')
                .required('Sexo é obrigatório.')
              break;
            case 'birthDate':
              acc[field.name] = yup
                .date() //verificar
                .typeError('Data de nascimento inválida.')
                .required('Data de nascimento é obrigatória.')
                .max(new Date(), 'Data de nascimento não pode ser no futuro.');
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
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onSubmit',
    });

    const internalSubmit = (data) => {
      if (onSubmit) onSubmit(data);
    };

    return (
        <section className={style.formGeneric}>
        
        <form onSubmit={handleSubmit(internalSubmit)} className={style.formStructure} noValidate>
            {sections.map((section, index) => (
            
            <div key={index} className={style.formSection}>
                {section.subtitle && (<h2 className={style.subtitle}>{section.subtitle}</h2>)}
                
                <div className={style.formGrid}>
                    {section.fields.map((field) => (
                        <article key={field.id} className={style.fieldGeneral}>
                            <label htmlFor={field.id} className={style.labelNameAsking}>
                                {field.label} {field.required && <span className={style.required}>*</span>}
                            </label>
                            <LabelInput
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                required={field.required}
                                register={register}
                                options={field.options}
                                errors={errors}
                            />
                        </article>
                    ))}
                </div>
            </div>
            ))}

            {footerMessage && <p className={style.footerMessage}>{footerMessage}</p>}

            <ButtonSubmit type="submit">{buttonLabel}</ButtonSubmit>
        </form>
        </section>
    );
};