import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import googleIcon from '@/assets/images/googleIcon.png';
import appleIcon from '@/assets/images/appleIcon.png';
import Separator from '@/shared-ui/separator';
import TextField from '@/shared-ui/textfield';
import { useNavigate } from 'react-router-dom';
import BlackLogo from '@/assets/svgs/logo_black';
import useSmallScreen from '@/hooks/useSmallScreen';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import useQueryParam from '@/hooks/useQueryParam';
import { Formik } from 'formik';
import { LoginInput } from '@/gql/graphql';
import { validationSchema } from '@/context/signUpFormContext/validationSchema';
import useSignIn from '@/api/restaurants/useSignIn';
import Loader from '@/shared-ui/loader';

function SignInForm() {
  return (
    <div className='w-full flex justify-center'>
      <div className='xs:hidden lg:block '>
        <SignInFormPC />
      </div>
      <div className='xs:block lg:hidden w-full'>
        <SignInFormMobile />
      </div>
    </div>
  );
}

export default SignInForm;

const CommonForm = () => {
  const navigate = useNavigate();
  const isSmall = useSmallScreen();
  const [isVisible, setIsVisible] = useState(false);
  const [_, setActiveMode] = useQueryParam('mode');
  const onToggleVisibility = () => setIsVisible((prev) => !prev);
  const { mutate: signIn, isPending } = useSignIn();

  const handleSignIn = (values: LoginInput) => {
    signIn(values);
  };

  return (
    <Formik<LoginInput>
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema[0]}
      onSubmit={handleSignIn}
    >
      {({ values, handleChange, errors, handleSubmit }) => (
        <form className='mt-5 ' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 '>
            <div>
              <TextField
                label='Email'
                name='email'
                placeholder='Enter your name'
                className='h-[20px]'
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                errorMessage={errors.email}
              />
            </div>
            <div>
              <TextField
                label='Password'
                name='password'
                type={isVisible ? 'text' : 'password'}
                placeholder='Enter password'
                className='h-[20px]'
                endIcon={
                  !isVisible ? (
                    <FaEyeSlash
                      onClick={onToggleVisibility}
                      className='cursor-pointer'
                    />
                  ) : (
                    <FaEye
                      onClick={onToggleVisibility}
                      className='cursor-pointer'
                    />
                  )
                }
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                errorMessage={errors.password}
              />
              <Text
                as={'div'}
                variant='small'
                role='button'
                className='!text-primary cursor-pointer !mb-0 mt-1 text-right'
                onClick={() => {
                  if (isSmall) setActiveMode('forgot-password');
                  else navigate('/forgot-password');
                }}
              >
                Forget Password ?
              </Text>
            </div>
            <div className='mt-auto'>
              <div>
                <Button
                  type='submit'
                  className='w-full'
                  endIcon={
                    isPending && (
                      <Loader className='!border-gray-400 size-[15px]' />
                    )
                  }
                >
                  Sign In
                </Button>
              </div>
              <div className='text-center mt-3'>
                <Text className='text-secondary-text ' variant='small'>
                  Don't have account yet?{' '}
                  <Text
                    variant='small'
                    role='button'
                    className='!text-primary cursor-pointer'
                    onClick={() => {
                      if (isSmall) setActiveMode('sign-up');
                      else navigate('/sign-up');
                    }}
                  >
                    Sign Up
                  </Text>
                </Text>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

const SignInFormPC = () => (
  <Card className='xs:w-full lg:w-[420px]  min-h-[560px] rounded-3xl'>
    <div>
      <div className='mt-4'>
        <Text as={'h6'} className='text-[24px] font-semibold text-center '>
          Sign In
        </Text>
      </div>
      <RenderSocialSignIn />
      <div className='mt-6'>
        <Separator text='OR CONTINUE WITH' />
      </div>
      <div>
        <CommonForm />
      </div>
    </div>
  </Card>
);

const SignInFormMobile = () => (
  <div>
    <div>
      <div>
        <BlackLogo />
      </div>
      <div>
        <Text
          as={'h6'}
          className='!text-[24px] text-primary-text font-semibold'
        >
          Sign In to
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
    <div>
      <CommonForm />
    </div>
  </div>
);

const RenderSocialSignIn = () => (
  <div className='flex flex-col gap-3 mt-10 w-full'>
    <Button
      variant='tertiary'
      className='border-2 text-primary-text font-semibold xs:w-full !lg:w-[360px] h-[52px]'
      startIcon={
        <img src={googleIcon} alt='mail' className='w-[23.45px] h-[25px]' />
      }
    >
      Sign In with Google
    </Button>
    <Button
      startIcon={
        <img src={appleIcon} alt='mail' className='w-[23.45px] h-[25px]' />
      }
      variant='tertiary'
      className='border-2 text-primary-text font-semibold xs:w-full !lg:w-[360px] h-[52px]'
    >
      Sign In with Apple
    </Button>
  </div>
);
