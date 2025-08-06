import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestHandlers } from '../../services/requestHandlers';
import { generateYupSchema } from '../../utils/validationSchema'
import LabelInput from '../../components/LabelInput/LabelInput';
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit'
import styles from './RegisterPatient.module.css';

export default function RegisterPatient() {
  const navigate = useNavigate();

  const sections = [
    {
      subtitle: "Preencha com as informações do paciente",
      fields: [
        {
          id: 'nomePaciente',
          label: 'Nome Completo:',
          type: 'text',
          name: 'fullName',
          placeholder: 'Digite o nome completo do paciente',
          required: true,
        },
        {
          id: 'cpfPaciente',
          label: 'CPF:',
          type: 'text',
          name: 'cpf',
          placeholder: 'Digite o cpf do paciente',
          required: true,
        },
        {
          id: 'telefone',
          label: 'Telefone:',
          type: 'text',
          name: 'phoneNumberPatient',
          placeholder: 'Digite o telefone do paciente',
          required: false,
          title: 'Digite um telefone válido, ex: (11) 91234-5678'
        },
        {
          id: 'emailPaciente',
          label: 'E-mail:',
          type: 'email',
          name: 'email',
          placeholder: 'Digite seu e-mail',
          pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$',
          title: 'Endereço de e-mail válido',
          required: true,
        },
        {
          id: 'nascimentoPaciente',
          label: 'Data de Nascimento:',
          type: 'date',
          name: 'birthDate',
          placeholder: 'Digite a data de nascimento do paciente',
          required: true,
        },
        {
          id: 'sexo',
          label: 'Sexo:',
          type: 'select',
          name: 'gender',
          required: true,
          options: [
            { label: 'Feminino', value: 'F' },
            { label: 'Masculino', value: 'M' },
            { label: 'Prefiro não declarar', value: 'ND' },
          ],
        },
      ],
    },
  ];

  const allFields = sections.flatMap(section => section.fields);
  const validationSchema = generateYupSchema(allFields);

  const handleRegisterPatientSubmit = async (formData) => {
    await RequestHandlers.registerPatient(formData, navigate);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const gray = {
    backgroundColor: '#555555',
  }

  return (
    <main className={styles.container}>
      <div className={styles.configurationContainer}>
        <section className={styles.headerSection}>
          <h2 className={styles.title}>{sections[0].subtitle}</h2>
          <p className={styles.subtitle}>
            Preencha os dados do paciente para continuar.
          </p>
        </section>

        <form className={styles.form} onSubmit={handleSubmit(handleRegisterPatientSubmit)}>
          <div className={styles.fieldRowFull}>
            <LabelInput
              id={sections[0].fields[0].id}
              name={sections[0].fields[0].name}
              type={sections[0].fields[0].type}
              label={sections[0].fields[0].label}
              placeholder={sections[0].fields[0].placeholder}
              required={sections[0].fields[0].required}
              register={register}
              options={sections[0].fields[0].options}
              errors={errors}
              className={gray}
            />
          </div>

          {/* CPF e Telefone lado a lado */}
          <div className={styles.gridTwoColumns}>
            {[sections[0].fields[1], sections[0].fields[2]].map(({ id, name, type, label, placeholder, required, options }) => (
              <div key={id} className={styles.fieldRow}>
                <LabelInput
                  id={id}
                  name={name}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  required={required}
                  register={register}
                  options={options}
                  errors={errors}
                  className={gray}
                />
              </div>
            ))}
          </div>

          {/* Email: linha inteira */}
          <div className={styles.fieldRowFull}>
            <LabelInput
              id={sections[0].fields[3].id}
              name={sections[0].fields[3].name}
              type={sections[0].fields[3].type}
              label={sections[0].fields[3].label}
              placeholder={sections[0].fields[3].placeholder}
              required={sections[0].fields[3].required}
              register={register}
              options={sections[0].fields[3].options}
              errors={errors}
              className={gray}
            />
          </div>

          {/* Data de Nascimento e Sexo lado a lado */}
          <div className={styles.gridTwoColumns}>
            {[sections[0].fields[4], sections[0].fields[5]].map(({ id, name, type, label, placeholder, required, options }) => (
              <div key={id} className={styles.fieldRow}>
                <LabelInput
                  id={id}
                  name={name}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  required={required}
                  register={register}
                  options={options}
                  errors={errors}
                  className={gray}
                />
              </div>
            ))}
          </div>

          <div className={styles.modalButtons}>
            <ButtonSubmit>Cadastrar</ButtonSubmit>
          </div>

          <p className={styles.footerMessage}>
            As instruções para a instalação do teclado virtual serão enviadas para o e-mail do paciente.
          </p>
        </form>
      </div>
    </main>
  );
}