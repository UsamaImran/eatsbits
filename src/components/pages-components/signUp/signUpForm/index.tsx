import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import googleIcon from '@/assets/images/googleIcon.png';
import appleIcon from '@/assets/images/appleIcon.png';
import Separator from '@/shared-ui/separator';
import TextField from '@/shared-ui/textfield';
import { useNavigate } from 'react-router-dom';
import BlackLogo from '@/assets/svgs/logo_black';
import useDisclosure from '@/hooks/useDisclosure';
import SignUpFormContextProvider from '@/context/signUpFormContext/SignUpFormContextProvider';
import SignUpFormModalLayout from '../signUpStepFormModal/components/layout';
import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';
import SignUpPCModal from '../signUpStepFormModal';
import useSmallScreen from '@/hooks/useSmallScreen';
import SuccessSwiper from '../successSwiper';
import SuccessModal from '../successModal';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useQueryParam from '@/hooks/useQueryParam';

function SignUpForm() {
  return (
    <SignUpFormContextProvider>
      <form onSubmit={(e) => e.preventDefault()} className='h-full'>
        <div className='w-full flex justify-center h-full'>
          {/* PC */}
          <div className='xs:hidden lg:flex items-center justify-center h-full'>
            <SignInFormPC />
          </div>
          {/* MOBILE */}
          <div className='xs:block lg:hidden w-full h-full'>
            <SignInFormMobile />
          </div>
        </div>
      </form>
    </SignUpFormContextProvider>
  );
}

export default SignUpForm;

const CommonForm = ({ onNext }: { onNext?: () => void }) => {
  const navigate = useNavigate();
  const isSmall = useSmallScreen();
  const [isVisible, setIsVisible] = useState(false);
  const [_, setActiveMode] = useQueryParam('mode');

  const { values, handleChange, errors } = useSignUpFormContext();

  const onToggleVisibility = () => setIsVisible((prev) => !prev);

  const getDisableStatus = () =>
    !!errors.email ||
    !values.email.length ||
    !!errors.password ||
    !values.password.length;

  return (
    <div className='flex flex-col gap-4 h-full '>
      <div>
        <TextField
          label='Email'
          name='email'
          value={values.email}
          placeholder='Enter your email'
          className='h-[20px]'
          onChange={handleChange}
          error={!!errors.email}
          errorMessage={errors.email}
        />
      </div>
      <div>
        <TextField
          label='Password'
          type={isVisible ? 'text' : 'password'}
          placeholder='Create password'
          className='h-[20px]'
          endIcon={
            !isVisible ? (
              <FaEyeSlash
                onClick={onToggleVisibility}
                className='cursor-pointer'
              />
            ) : (
              <FaEye onClick={onToggleVisibility} className='cursor-pointer' />
            )
          }
          name='password'
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <div className='mt-auto'>
        <div>
          <Button
            disabled={getDisableStatus()}
            type='submit'
            className='w-full'
            onClick={() => onNext && onNext()}
          >
            Sign Up
          </Button>
        </div>
        <div className='text-center mt-3'>
          <Text className='text-secondary-text' variant='small'>
            Already have an account{' '}
            <Text
              variant='small'
              role='button'
              className='!text-primary cursor-pointer'
              onClick={() => {
                if (isSmall) setActiveMode('sign-in');
                else navigate('/sign-in');
              }}
            >
              Sign In
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};

const SignInFormPC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { triggerSuccess, closeSuccessModal, onNext } = useSignUpFormContext();
  const isSmallScreen = useSmallScreen();

  return (
    <Card className='xs:w-full lg:w-[420px]  min-h-[531px] rounded-3xl'>
      <div>
        {!isSmallScreen && (
          <SuccessModal
            open={triggerSuccess}
            onClose={() => {
              closeSuccessModal();
              onClose();
              navigate('/');
            }}
          />
        )}
        <div className='mt-4'>
          <Text as={'h6'} className='text-[24px] font-semibold text-center '>
            Sign Up
          </Text>
        </div>
        <RenderSocialSignIn />
        <div className='mt-10'>
          <Separator text='OR CONTINUE WITH' />
        </div>
        <div>
          <CommonForm
            onNext={() => {
              onNext(0);
              onOpen();
            }}
          />
        </div>
        <SignUpPCModal open={isOpen} onClose={onClose} />
      </div>
    </Card>
  );
};

const SignInFormMobile = () => {
  const isSmallScreen = useSmallScreen();
  const { isOpen, onOpen } = useDisclosure();
  const { currentStep, triggerSuccess, closeSuccessModal, onNext } =
    useSignUpFormContext();

  return (
    <div className='h-full'>
      {!isOpen ? (
        <div className='h-full flex flex-col'>
          <div>
            <div>
              <BlackLogo />
            </div>
            <div>
              <Text
                as={'h6'}
                className='!text-[24px] text-primary-text font-semibold'
              >
                Sign Up to
              </Text>
              <Text className='!text-[24px] text-secondary-text'>EatsBits</Text>
            </div>
          </div>
          <div className=' w-full'>
            <RenderSocialSignIn />
          </div>
          <div className='mt-10'>
            <Separator text='OR CONTINUE WITH' />
          </div>
          <div className='h-full'>
            <CommonForm
              onNext={() => {
                onNext(0);
                onOpen();
              }}
            />
          </div>
        </div>
      ) : (
        <div className='h-full'>
          <SignUpFormModalLayout>{currentStep.component}</SignUpFormModalLayout>
        </div>
      )}
      {isSmallScreen && (
        <SuccessSwiper
          open={triggerSuccess}
          onClose={() => {
            closeSuccessModal();
          }}
        />
      )}
    </div>
  );
};

const RenderSocialSignIn = () => (
  <div className='flex flex-col gap-3 mt-10 w-full'>
    <Button
      variant='tertiary'
      className='border-2 text-primary-text font-semibold xs:w-full !lg:w-[360px] h-[52px]  px-3'
      startIcon={
        <img src={googleIcon} alt='mail' className='w-[23.45px] h-[25px]' />
      }
    >
      Sign Up with Google
    </Button>
    <Button
      startIcon={
        <img src={appleIcon} alt='mail' className='w-[23.45px] h-[25px]' />
      }
      variant='tertiary'
      className='border-2 text-primary-text font-semibold xs:w-full !lg:w-[360px] h-[52px] px-3'
    >
      Sign Up with Apple
    </Button>
  </div>
);
