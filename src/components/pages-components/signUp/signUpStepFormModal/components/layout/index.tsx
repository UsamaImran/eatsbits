import Text from '@/shared-ui/text';
import { PropsWithChildren } from 'react';
import Stepper from '../stepper';
import Button from '@/shared-ui/button';
import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';
import useSignUp from '@/api/restaurants/useSignUp';
import Loader from '@/shared-ui/loader';

function SignUpFormModalLayout({ children }: PropsWithChildren) {
  const { onNext, onPrev, currentIndex, openSuccessModal, errors, values } =
    useSignUpFormContext();

  const { mutate: signUp, isPending } = useSignUp();

  const renderHeading = () => (
    <div>
      <Text as={'h6'} variant='h6' className='sm:text-[24px] lg:text-[32px]'>
        Welcome On Board!
      </Text>
      <div className='xs:mt-2 lg:mt-6'>
        <Text className='text-[14px] text-dark-4 capitalize'>
          Let us collect some info about you very fast.
        </Text>
      </div>
    </div>
  );

  const signUpHandler = () => {
    const httpOrHttps = window.location.href.split('//')[0];
    signUp(
      {
        ...values,
        hostName: httpOrHttps + '//' + window.location.host,
      },
      {
        onSuccess: () => {
          openSuccessModal();
        },
      }
    );
  };

  const nextHandler = () => {
    if (currentIndex === 1) {
      signUpHandler();
      return;
    }

    onNext();
  };

  const getDisableStatus = () => {
    let status = false;
    switch (currentIndex) {
      case 0: {
        status =
          !values.firstName.length ||
          !!errors.firstName ||
          !values.lastName.length ||
          !!errors.lastName;
        break;
      }
      case 1: {
        status = isPending || false;
        break;
      }
      default:
        status = false;
    }
    return status;
  };

  return (
    <div className='flex flex-col xs:items-start lg:items-center h-full gap-5'>
      <div>{renderHeading()}</div>
      <div className='mt-5'>
        <Stepper />
      </div>
      <div className='mt-0 w-full xs:px-0 lg:px-40'> {children}</div>

      <div className='flex justify-between lg:flex-row xs:flex-col mt-auto w-full xs:gap-3 lg:gap-0 '>
        {currentIndex !== 0 && (
          <div className='xs:w-full lg:w-auto'>
            <Button className='w-full' onClick={onPrev}>
              Previous Step
            </Button>
          </div>
        )}
        <div className='!ml-auto xs:w-full lg:w-auto flex flex-col lg:flex-row gap-2'>
          {currentIndex === 1 && (
            <Button
              disabled={isPending}
              className='w-full'
              onClick={() => signUpHandler()}
            >
              Skip Step
            </Button>
          )}
          <Button
            disabled={getDisableStatus()}
            className='w-full'
            onClick={nextHandler}
            endIcon={
              isPending && <Loader className='border-gray-400 size-[15px]' />
            }
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpFormModalLayout;
