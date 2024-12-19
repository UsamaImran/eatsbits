import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required('Required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().matches(/^\d+$/, 'Zip Code must only contain numbers'),
});
