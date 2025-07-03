import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RequestHandlers } from '../../services/requestHandlers';
import GenericForm from '../../components/Forms/GenericForm'; 

export default function RegisterPatient() {
  const navigate = useNavigate();

  const handleRegisterPatientSubmit = async (formData) => {
    await RequestHandlers.registerPatient(formData, navigate);
  };

  const {
    register,
    formState: { errors },
  } = useForm();

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
          id: 'telefone',
          label: 'Telefone:',
          type: 'text',
          name: 'phoneNumberPatient',
          placeholder: 'Digite o telefone do paciente',
          required: false,
          title: 'Digite um telefone válido, ex: (11) 91234-5678'
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
        {
          id: 'nascimentoPaciente',
          label: 'Data de Nascimento:',
          type: 'date',
          name: 'birthDate',
          placeholder: 'Digite a data de nascimento do paciente',
          required: true,
        },
      ],
    },
  ];

  return (
    <GenericForm
      sections={sections}
      buttonLabel="Cadastrar"
      footerMessage="As instruções para a instalação do teclado virtual serão enviadas para o e-mail do paciente."
      onSubmit={handleRegisterPatientSubmit}
      register={register}
      errors={errors}
    />
  );
}
