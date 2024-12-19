import Logo from '@/assets/svgs/logo';
import AnimationContainer from '@/shared-ui/animationContainer';
import Text from '@/shared-ui/text';
import { useAppSelector } from '@/store/store';
import { PropsWithChildren, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SessionLayout({ children }: PropsWithChildren) {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, []);

  return (
    <div className='bg-linear-gradient h-[100vh]  bg-cover'>
      <div className='flex justify-center items-center h-full'>
        <AnimationContainer>
          <div className='flex flex-col gap-36'>
            <div className='flex justify-center'>
              <Link to={'/'}>
                <div className='flex items-center gap-3'>
                  <Logo />

                  <Text as={'p'} variant='h6' className='text-[22.7px]'>
                    EatsBits
                  </Text>
                </div>
              </Link>
            </div>
            <div>{children}</div>
          </div>
        </AnimationContainer>
      </div>
    </div>
  );
}

export default SessionLayout;
