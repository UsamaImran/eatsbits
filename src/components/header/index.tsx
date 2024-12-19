import Separator from '@/shared-ui/separator';

import AppLayout from '../layouts/layout';
import Button from '@/shared-ui/button';
import Logo from '@/assets/svgs/logo';
import TextField from '@/shared-ui/textfield';
import Text from '@/shared-ui/text';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MobileSearchModal from './mobileSearchModal';
import SignInMobileModal from '../pages-components/signIn/signInMobileModal/signInMobileModal';
import MobileBackButton from '@/assets/svgs/mobileBackButton';
import useSmallScreen from '@/hooks/useSmallScreen';
import { useAppDispatch, useAppSelector } from '@/store/store';
import LoggedInUser from './loggedInUser';

import { logout } from '@/store/slices/userSlice';
import { IoIosLogOut } from 'react-icons/io';

function Header() {
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSmall = useSmallScreen();

  return (
    <div className=''>
      <AppLayout>
        <div className='flex justify-between items-center lg:h-[102px] xs:h-[80px]'>
          <div className='flex gap-3 items-center'>
            <div className='flex gap-2 items-center'>
              {pathname !== '/' && isSmall && (
                <button type='button' onClick={() => navigate(-1)}>
                  <MobileBackButton />
                </button>
              )}
              <Link to={'/'}>
                <div className='flex items-center gap-3'>
                  <Logo />
                  <Text as={'p'} variant='h6' className='text-[22.7px]'>
                    EatsBits
                  </Text>
                </div>
              </Link>
            </div>
            <div className='xs:hidden lg:block w-[446px]'>
              <TextField
                startIcon={<CiSearch />}
                placeholder='Search for restaurants, food'
              />
            </div>
          </div>
          {/* PC */}
          {user.isLoggedIn ? (
            <div className='lg:flex lg:items-center gap-3 xs:hidden '>
              <LoggedInUser /> <LogoutButton />
            </div>
          ) : (
            <div className='lg:flex gap-2 xs:hidden '>
              <Button variant='tertiary' onClick={() => navigate('/sign-in')}>
                Login
              </Button>
              <Button onClick={() => navigate('/sign-up')}>Sign Up</Button>
            </div>
          )}

          {/* Mobile */}
          <div className='lg:hidden  xs:flex xs:items-center gap-3'>
            <MobileSearchModal />

            {user.isLoggedIn ? (
              <>
                <LoggedInUser />
                <LogoutButton />
              </>
            ) : (
              <SignInMobileModal />
            )}
          </div>
        </div>
      </AppLayout>
      <Separator />
    </div>
  );
}

export default Header;

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div className=''>
      <IoIosLogOut size={30} onClick={() => dispatch(logout())} />
    </div>
  );
};
