import { PropsWithChildren } from 'react';
import Modal from '.';
import MobileBackButton from '@/assets/svgs/mobileBackButton';
import Separator from '../separator';
import Text from '../text';
interface Props extends PropsWithChildren {
  title: string;
  onBack: () => void;
}

const FullScreenModal = ({ children, onBack, title }: Props) => {
  const renderModalHeader = () => (
    <div className='mt-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4 w-full'>
          <button onClick={onBack}>
            <MobileBackButton />
          </button>
          <Text as='p' variant='h6' className='!font-medium'>
            {title}
          </Text>
        </div>
      </div>
      <div className='mt-4'>
        <Separator />
      </div>
    </div>
  );

  return (
    <Modal
      open
      onClose={() => {}}
      isFullScreen
      className={'w-full min-w-full min-h-[100vh] m-0! !bg-gray-1'}
      header={renderModalHeader()}
    >
      <div className='h-full'>{children}</div>
    </Modal>
  );
};

export default FullScreenModal;
