import Text from '@/shared-ui/text';
import { useAppSelector } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const LoggedInUser = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const name = `${user?.firstName[0].toUpperCase()} ${user?.lastName[0].toUpperCase()}`;

  return (
    <div
      className='flex items-center justify-center gap-3'
      role='button'
      onClick={() => navigate('/profile')}
    >
      <div className='border-[2px] size-[48px] rounded-xl flex items-center justify-center'>
        <div className='size-[42px] rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FD8064] to-[#FEA793]'>
          <span className='text-white font-semibold'>{name}</span>
        </div>
      </div>
      <div className='lg:block xs:hidden'>
        <Text as={'h6'} className=' !text-[16px] !font-[500] !m-0 !p-0'>
          {user?.firstName} {user?.lastName}
        </Text>
      </div>
    </div>
  );
};

export default LoggedInUser;
