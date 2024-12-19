import AnimationContainer from '@/shared-ui/animationContainer';
import MyDrawer from '@/shared-ui/drawer';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

function CartDrawerPC({ open, onClose, children }: Props) {
  return (
    <MyDrawer open={open} className='!w-[504px] ' onClose={onClose} header>
      <AnimationContainer
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className='w-[440px]'>{children}</div>
      </AnimationContainer>
    </MyDrawer>
  );
}

export default CartDrawerPC;
