import MyDrawer from '@/shared-ui/drawer';
import signupMobileSuccess from '@/assets/images/signup_mobile_success.jpg';
import Text from '@/shared-ui/text';
import Button from '@/shared-ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: (val: boolean) => void;
}

function SuccessSwiper({ open, onClose }: Props) {
  const navigate = useNavigate();
  return (
    <MyDrawer
      direction='bottom'
      lockBackgroundScroll
      size={340}
      open={open}
      onClose={() => onClose(false)}
    >
      <div className='flex flex-col items-center h-full gap-4'>
        <div>
          <img src={signupMobileSuccess} alt='success' />
        </div>
        <div className='text-center'>
          <Text as='p' variant='h6' className='text-[24px] '>
            Congratulations on authorising your account!
          </Text>
          <Text variant='small' className='text-secondary-text'>
            Begin placing your orders right away
          </Text>
        </div>
        <div>
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </MyDrawer>
  );
}

export default SuccessSwiper;
