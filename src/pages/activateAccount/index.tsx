import useAccountVerification from '@/api/restaurants/useAccountVerification';
import Logo from '@/assets/svgs/logo';
import Loader from '@/shared-ui/loader';

import { Link } from 'react-router-dom';

function ActivateAccount() {
  const { data, isLoading, isError } = useAccountVerification();
  const message = data?.activateUserAccount?.message;

  if (isError) return <p>Error : Account Activation Failed</p>;
  return (
    <div className='flex justify-center flex-col items-center gap-64'>
      <div className=' mt-[5%]'>
        <div className='flex '>
          <Logo />
          <h1 className='ml-2 text-3xl'>EatsBits</h1>
        </div>
      </div>
      <div className='max-sm:mt-[5%] w-[420px] rounded-[12px] mt-[0%] p-6 border border-lightGrey'>
        <h1 className='text-center text-2xl mt-2'>
          {isLoading ? <Loader /> : message?.length > 0 && message}
        </h1>
      </div>

      <div className='flex justify-center items-center absolute bottom-12 cursor-pointer'>
        <div className='mr-2'>{/* <img src={ArrowBack} alt='' /> */}</div>
        <Link to='/sign-in'>
          <h1 className='text-orange'>Back To Login</h1>
        </Link>
      </div>
    </div>
  );
}

export default ActivateAccount;
