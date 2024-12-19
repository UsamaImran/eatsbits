import Modal from '@/shared-ui/modal';
import signUpSuccess from '@/assets/images/signup_success.jpg';
import Text from '@/shared-ui/text';
import Button from '@/shared-ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: (val: boolean) => void;
}

function SuccessModal({ open, onClose }: Props) {
  const navigate = useNavigate();
  return (
    <Modal
      className={'max-w-[744px] min-h-[489.92px]'}
      open={open}
      onClose={onClose}
    >
      <div className='flex flex-col items-center justify-between h-full'>
        <div>
          <img
            src={signUpSuccess}
            alt='sign-up success'
            className='w-[294px] h-[209.92px]'
          />
        </div>
        <div className='text-center flex flex-col gap-3 mt-2 '>
          <Text as={'h6'} variant='h6' className='text-[24px]'>
            We are excited you have registered an account with us!
          </Text>
          <Text variant='small' className='text-[14px] text-secondary-text'>
            A link to the provided email, please click to activate your account.
          </Text>
        </div>
        <div className='mt-3'>
          <Button
            variant='secondary'
            className='font-[500]'
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessModal;
