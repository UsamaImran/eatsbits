import { CreateUserInput } from '@/gql/graphql';

import type { FormikProps } from 'formik';
export interface ISignUpFormContext extends FormikProps<IForm> {
  currentIndex: number;
  onNext: (val?: number) => void;
  onPrev: () => void;
  formValues: IForm;
  currentStep: IFormStep;
  triggerSuccess: boolean;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}

export interface IFormStep {
  name: string;
  component: React.ReactNode;
}

export type IForm = CreateUserInput;

export const DEFAULT_FORM_VALUES: IForm = {
  email: '',
  firstName: '',
  hostName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
};
