import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import TextField from '@/shared-ui/textfield';
import { useNavigate } from 'react-router-dom';
import BlackLogo from '@/assets/svgs/logo_black';
import { FaArrowLeft } from 'react-icons/fa6';
import useSmallScreen from '@/hooks/useSmallScreen';
import useQueryParam from '@/hooks/useQueryParam';

function ForgotPasswordForm() {
  return (
    <div className='w-full flex justify-center'>
      <div className='xs:hidden lg:block '>
        <ForgotPasswordFormPC />
      </div>
      <div className='xs:block lg:hidden w-full'>
        <ForgotPasswordFormMobile />
      </div>
    </div>
  );
}

export default ForgotPasswordForm;

const CommonForm = () => {
  const isSmall = useSmallScreen();
  const navigate = useNavigate();
  const [_, setActiveMode] = useQueryParam('mode');

  return (
    <form className='mt-5 ' onSubmit={(e) => e.preventDefault()}>
      <div className='flex flex-col gap-4 '>
        <div>
          <TextField
            id='email'
            label='Email'
            placeholder='Enter your name'
            className='h-[20px]'
          />
        </div>
        <div className='mt-auto'>
          <div>
            <Button
              type='submit'
              className='w-full'
              onClick={() => {
                if (isSmall) setActiveMode('reset-password');
                else navigate('/reset-password');
              }}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

const ForgotPasswordFormPC = () => {
  const navigate = useNavigate();
  return (
    <Card className='xs:w-full lg:w-[420px]  h-[280px] rounded-3xl'>
      <div>
        <div className='mt-4'>
          <Text as={'h6'} className='text-[24px] font-semibold text-center '>
            Forgot Password ?
          </Text>
        </div>
        <div>
          <CommonForm />
        </div>
        <div
          role='button'
          className='flex justify-center items-center gap-2 mt-10 cursor-pointer'
          onClick={() => navigate('/sign-in')}
        >
          <FaArrowLeft className='!text-primary' />
          <Text variant='small' className='!text-primary !m-0'>
            Back to login
          </Text>
        </div>
      </div>
    </Card>
  );
};

const ForgotPasswordFormMobile = () => (
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
          Forgot Password ?
        </Text>
      </div>
    </div>
    <div>
      <CommonForm />
    </div>
  </div>
);
