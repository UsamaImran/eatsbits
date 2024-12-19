import SuccessImg from '@/assets/images/signup_mobile_success.jpg';
import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import { useNavigate } from 'react-router-dom';

export const SuccessCard = () => {
  const navigate = useNavigate();

  const heading = 'Congratulations! Your order has been placed successfully!';
  const subHeading = '';

  const onHanldeDone = () => {
    navigate('/');
  };

  return (
    <Card className='mt-10'>
      <div className='flex justify-center items-center flex-col rounded-2xl py-8 px-20'>
        <div>
          <img src={SuccessImg} alt='' />
        </div>
        <div className='mt-8'>
          <h1 className='text-2xl font-medium text-center'>{heading}</h1>
        </div>
        <div className='mt-2'>
          {subHeading && <p className='text-sm'>{subHeading}</p>}
        </div>
        <div>
          <div className='mt-4'>
            <Button onClick={onHanldeDone}>Done</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
