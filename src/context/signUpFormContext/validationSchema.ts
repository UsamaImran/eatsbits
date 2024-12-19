import * as Yup from 'yup';

export const validationSchema = [
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address') // Built-in email validation
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address with a TLD (e.g., .com, .org)'
      ),
    password: Yup.string()
      .min(4, 'mininum 5 length is required')
      .required('Required'),
  }),
  Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phoneNumber: Yup.string(),
  }),
  Yup.object().shape({}),
];
