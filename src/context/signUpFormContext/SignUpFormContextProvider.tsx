import { PropsWithChildren, useState } from 'react';
import { SignUpFormContextContainer } from './signUpFormContext';
import { DEFAULT_FORM_VALUES, ISignUpFormContext } from './types';
import { formSteps } from './formSteps';
import { Formik } from 'formik';
import { validationSchema } from './validationSchema';

function SignUpFormContextProvider({ children }: PropsWithChildren) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const currentStep = formSteps.at(currentIndex);
  const [triggerSuccess, setTriggerSuccess] = useState(false);

  const onNext = (number?: number) => {
    if (typeof number === 'number') {
      setCurrentIndex(number);
    } else if (currentIndex < formSteps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const onPrev = () => currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

  const openSuccessModal = () => setTriggerSuccess(true);
  const closeSuccessModal = () => setTriggerSuccess(false);

  const contextValues: Partial<ISignUpFormContext> = {
    currentStep,
    currentIndex,
    triggerSuccess,
    openSuccessModal,
    closeSuccessModal,
    onNext,
    onPrev,
  };

  const getValidationSchema = () =>
    currentIndex !== -1
      ? validationSchema[0]
      : validationSchema[currentIndex + 1];

  return (
    <Formik
      initialValues={DEFAULT_FORM_VALUES}
      onSubmit={() => {}}
      validationSchema={getValidationSchema()}
    >
      {(props) => (
        <SignUpFormContextContainer
          value={{ ...contextValues, ...props } as ISignUpFormContext}
        >
          {children}
        </SignUpFormContextContainer>
      )}
    </Formik>
  );
}

export default SignUpFormContextProvider;
