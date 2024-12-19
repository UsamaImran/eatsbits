import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import TextField from '@/shared-ui/textfield';
import { useNavigate } from 'react-router-dom';
import BlackLogo from '@/assets/svgs/logo_black';
import useSmallScreen from '@/hooks/useSmallScreen';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import useQueryParam from '@/hooks/useQueryParam';

function ResetPasswordForm() {
  return (
    <div className='w-full flex justify-center'>
      <div className='xs:hidden lg:block '>
        <ResetPasswordFormPC />
      </div>
      <div className='xs:block lg:hidden w-full'>
        <ResetPasswordFormMobile />
      </div>
    </div>
  );
}

export default ResetPasswordForm;

const CommonForm = () => {
  const isSmall = useSmallScreen();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [_, setActiveMode] = useQueryParam('mode');
  const onToggleVisibility = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirmPassword = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

  return (
    <form className='mt-5 ' onSubmit={(e) => e.preventDefault()}>
      <div className='flex flex-col gap-4 '>
        <div>
          <TextField
            id='newPassword'
            label='New password'
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder='Enter your new password'
            className='h-[20px]'
            endIcon={
              !isPasswordVisible ? (
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
          />
        </div>
        <div>
          <TextField
            id='confirmPassword'
            label='Confirm password'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder='Confirm your new password'
            className='h-[20px]'
            endIcon={
              !isConfirmPasswordVisible ? (
                <FaEyeSlash
                  onClick={onToggleConfirmPassword}
                  className='cursor-pointer'
                />
              ) : (
                <FaEye
                  onClick={onToggleConfirmPassword}
                  className='cursor-pointer'
                />
              )
            }
          />
        </div>
        <div className='mt-auto'>
          <div>
            <Button
              type='submit'
              className='w-full'
              onClick={() => {
                if (isSmall) setActiveMode('sign-in');
                else navigate('/');
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

const ResetPasswordFormPC = () => {
  return (
    <Card className='xs:w-full lg:w-[420px]  h-[310px] rounded-3xl'>
      <div>
        <div className='mt-4'>
          <Text as={'h6'} className='text-[24px] font-semibold text-center '>
            Reset Password
          </Text>
        </div>
        <div>
          <CommonForm />
        </div>
      </div>
    </Card>
  );
};

const ResetPasswordFormMobile = () => (
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
          Reset Password
        </Text>
      </div>
    </div>
    <div>
      <CommonForm />
    </div>
  </div>
);
