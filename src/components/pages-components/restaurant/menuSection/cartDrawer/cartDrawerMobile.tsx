import AnimationContainer from '@/shared-ui/animationContainer';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';

import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onBack: () => void;
}

function CartDrawerMobile({ onBack, children }: Props) {
  return (
    <FullScreenModal title='Checkout' onBack={onBack}>
      <AnimationContainer>{children}</AnimationContainer>
    </FullScreenModal>
  );
}

export default CartDrawerMobile;
