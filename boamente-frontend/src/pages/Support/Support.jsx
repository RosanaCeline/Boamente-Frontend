import  React from 'react';
import "../../style.css";
import { useForm } from 'react-hook-form';
import { RequestHandlers } from '../../services/requestHandlers';
import GenericForm from '../../components/Forms/GenericForm'; 

export default function Support() {
    const handleCreateTicketSubmit = async (formData) => {
        await RequestHandlers.createSupportTicket(formData);
    };

  const {
    register,
    formState: { errors },
  } = useForm();

  const sections = [
    {
      subtitle: "Envie uma Solicitação de Suporte",
      fields: [
        {
          id: 'assunto',
          label: 'Assunto:',
          type: 'text',
          name: 'subject',
          placeholder: 'Digite o assunto da sua solicitação...',
          required: true,
        },
        {
          id: 'descricao',
          label: 'Descrição:',
          type: 'textarea',
          name: 'description',
          placeholder: 'Digite aqui os detalhes...',
          required: true,
        },
      ],
    },
  ];

  return (
    <GenericForm
      sections={sections}
      buttonLabel="Enviar Solicitação"
      footerMessage="Enviaremos a resposta da sua solicitação para seu e-mail em breve!"
      onSubmit={handleCreateTicketSubmit}
      register={register}
      errors={errors}
    />
  );
}