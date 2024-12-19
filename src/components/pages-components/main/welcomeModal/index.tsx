import PrimaryCheck from '@/assets/svgs/primaryCheck';
import UserSmall from '@/assets/svgs/userSmall';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useSmallScreen from '@/hooks/useSmallScreen';
import Card from '@/shared-ui/card';
import Modal from '@/shared-ui/modal';
import Text from '@/shared-ui/text';
import { useAppSelector } from '@/store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeModal() {
  const navigate = useNavigate();
  const isSmall = useSmallScreen();
  const { item, setItem } = useLocalStorage('SHOULD_DISPLAY_WELCOME_MESSAGE');
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [open, setOpen] = useState(
    () => !isSmall && !isLoggedIn && (item === null || item === 'true')
  );

  const closeModal = () => {
    setOpen(false);
    setItem('false');
  };

  return (
    !isSmall && (
      <Modal
        open={open}
        onClose={closeModal}
        className={'min-w-[697px]'}
        header={<Text className='font-semibold '>Welcome to EatsBits!</Text>}
      >
        <div className='flex lg:flex-row  xs:flex-col gap-2 mt-5'>
          <div
            className='w-[316px]'
            role='button'
            onClick={() => {
              closeModal();
              navigate('sign-in');
            }}
          >
            <OptionCard
              logo={<PrimaryCheck />}
              title='Sign Up or Log In'
              content={
                'As a registered user, you can pay for your order contactless'
              }
            />
          </div>
          <div className='w-[316px]' role='button' onClick={closeModal}>
            <OptionCard
              logo={<UserSmall />}
              title='Continue as guest'
              content={
                'Payment will only be available on contact with our employee.'
              }
            />
          </div>
        </div>
      </Modal>
    )
  );
}

export default WelcomeModal;

const OptionCard = ({
  logo,
  title,
  content,
}: {
  logo: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <Card className='bg-white cursor-pointer hover:bg-gray-2 !w- !p-[24px]'>
      <div className='flex justify-between items-center flex-col gap-3 w-full'>
        <div>{logo}</div>
        <div className='flex flex-col gap-2 items-center'>
          <Text variant='small' className='font-bold'>
            {title}
          </Text>

          <Text className='!text-dark-1 text-center' variant='small'>
            {content}
          </Text>
        </div>
      </div>
    </Card>
  );
};
