import * as Yup from 'yup';

export function generateYupSchema(fields) {
  const shape = {};

  fields.forEach(({ name, type, required, pattern }) => {
    if (!name) return;

    let validator;

    switch (type) {
      case 'text':
        validator = Yup.string();
        if (pattern) {
          // Regexp no padrão string (ex: para email)
          validator = validator.matches(new RegExp(pattern), 'Formato inválido');
        }
        if (required) validator = validator.required('Campo obrigatório');
        break;

      case 'email':
        validator = Yup.string().email('Email inválido');
        if (required) validator = validator.required('Campo obrigatório');
        break;

      case 'date':
        validator = Yup.date().typeError('Data inválida');
        if (required) validator = validator.required('Campo obrigatório');
        break;

      case 'select':
        validator = Yup.string();
        if (required) validator = validator.required('Campo obrigatório');
        break;

      default:
        validator = Yup.string();
        if (required) validator = validator.required('Campo obrigatório');
        break;
    }

    shape[name] = validator;
  });

  return Yup.object().shape(shape);
}
