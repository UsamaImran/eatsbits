import Modal from '@/shared-ui/modal';
import User from '@/assets/svgs/user';
import useDisclosure from '@/hooks/useDisclosure';
import MobileBackButton from '@/assets/svgs/mobileBackButton';
import Text from '@/shared-ui/text';
import Separator from '@/shared-ui/separator';
import Card from '@/shared-ui/card';
import RightArrow from '@/assets/svgs/rightArrow';
import PrimaryCheck from '@/assets/svgs/primaryCheck';
import UserSmall from '@/assets/svgs/userSmall';
import { useState } from 'react';
import SignUpForm from '../../signUp/signUpForm';
import SignInForm from '../signInForm.tsx';
import ForgotPasswordForm from '../../forgotPassword/forgotPasswordForm';
import ResetPasswordForm from '../../resetPassword/resetPasswordForm';
import useQueryParam from '@/hooks/useQueryParam';

function SignonMobileModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displaySignUpForm, setDisplaySignUpForm] = useState(false);
  const [activeMode, setActiveMode] = useQueryParam('mode');

  const reset = () => {
    onClose();
    setDisplaySignUpForm(false);
  };

  const renderHeader = () => (
    <div className='mt-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4 w-full'>
          <button onClick={reset}>
            <MobileBackButton />
          </button>
          <Text as='p' variant='h6' className='!font-medium'>
            Authorization
          </Text>
        </div>
        <div>
          <User />
        </div>
      </div>
      <div className='mt-4'>
        <Separator />
      </div>
    </div>
  );

  const formComponents: { [key: string]: JSX.Element | null } = {
    'sign-in': <SignInForm />,
    'sign-up': <SignUpForm />,
    'forgot-password': <ForgotPasswordForm />,
    'reset-password': <ResetPasswordForm />,
  };

  return (
    <div>
      <button className='mt-1' onClick={onOpen}>
        <User />
      </button>
      <Modal
        isFullScreen
        open={isOpen}
        onClose={onClose}
        header={renderHeader()}
        className={'w-full min-w-full min-h-[100vh] m-0! bg-gray-1 !px-1'}
      >
        <div className='h-full p-6 '>
          {!displaySignUpForm ? (
            <div className='my-4'>
              <div>
                <Text as={'h3'} variant='h6'>
                  Welcome to EatsBits
                </Text>
                <Text className='text-secondary-text'>
                  We are happy to greet you
                </Text>
              </div>
              <div className='my-4 flex flex-col gap-5'>
                <div
                  role='button'
                  onClick={() => {
                    setDisplaySignUpForm(true);
                    setActiveMode('sign-up');
                  }}
                >
                  <SignInCard
                    logo={<PrimaryCheck />}
                    title='Sign Up or Log In'
                    content={
                      ' A registered user has options to view history orders and  receive promotions etc.'
                    }
                  />
                </div>
                <div role='button' onClick={onClose}>
                  <SignInCard
                    logo={<UserSmall />}
                    title='Continue as guest'
                    content={''}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='mt-4 h-full'>
              {(activeMode && formComponents[activeMode]) || null}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default SignonMobileModal;

const SignInCard = ({
  logo,
  title,
  content,
}: {
  logo: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <Card className='bg-white '>
      <div className='flex justify-between  gap-3 w-full'>
        <div>{logo}</div>
        <div className='flex flex-col gap-3'>
          <Text variant='small' className='font-bold'>
            {title}
          </Text>

          <Text className='text-secondary-text' variant='extra-small'>
            {content}
          </Text>
        </div>
        <div className='my-auto'>
          <RightArrow />
        </div>
      </div>
    </Card>
  );
};
