import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GenericForm from '../../components/Forms/GenericForm'; 

export default function RegisterPatient() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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
          name: 'nomePaciente',
          placeholder: 'Digite o nome completo do paciente',
          required: true,
        },
        {
          id: 'emailPaciente',
          label: 'E-mail:',
          type: 'email',
          name: 'emailPaciente',
          placeholder: 'Digite seu e-mail',
          pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$',
          title: 'Endereço de e-mail válido',
          required: true,
        },
        {
          id: 'telefone',
          label: 'Telefone:',
          type: 'text',
          name: 'telefone',
          placeholder: 'Digite o telefone do paciente',
          required: false,
        },
        {
          id: 'sexo',
          label: 'Sexo:',
          type: 'select',
          name: 'sexo',
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
          type: 'text',
          name: 'nascimentoPaciente',
          placeholder: 'Digite a data de nascimento do paciente',
          required: true,
        },
      ],
    },
  ];

  const handleRegister = (formData) => {
    console.log('Dados do paciente:', formData);
    // lógica para envio da API aqui
    navigate('/listagemdepacientes'); // redireciona após o cadastro
  };

  return (
    <GenericForm
      sections={sections}
      buttonLabel="Cadastrar"
      footerMessage="As instruções para a instalação do teclado virtual serão enviadas para o e-mail do paciente."
      onSubmit={handleSubmit(handleRegister)}
      register={register}
      errors={errors}
    />
  );
}
