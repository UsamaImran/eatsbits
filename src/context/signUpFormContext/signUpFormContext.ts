import { createContext, useContext } from 'react';
import { ISignUpFormContext } from './types';

export const SignUpFormContext = createContext({} as ISignUpFormContext);

export const SignUpFormContextContainer = SignUpFormContext.Provider;

export const useSignUpFormContext = () => {
  const formContext = useContext(SignUpFormContext);

  if (!formContext) {
    throw new Error(
      'useSignUpFormContext must be used within a SignUpFormContextProvider'
    );
  }
  return formContext;
};
