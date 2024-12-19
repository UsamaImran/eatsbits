import React, { PropsWithChildren } from 'react';
import { IoMdClose } from 'react-icons/io';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Separator from '../separator';
import SwiperIcon from '@/assets/svgs/swiper';
import useSwipeDirection from '@/hooks/useSwipeDirection';
import useSmallScreen from '@/hooks/useSmallScreen';
import Portal from '../portal';
interface Props extends PropsWithChildren, React.ComponentProps<typeof Drawer> {
  open: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  containerProps?: React.ComponentProps<'div'>;
}

const MyDrawer = ({
  children,
  onClose,
  header,
  footer,
  containerProps,
  open,
  ...rest
}: Partial<Props>) => {
  const { direction, ref } = useSwipeDirection();
  const isSmallScreen = useSmallScreen();

  const renderHeader = () => (
    <div>
      <div
        className='w-full xs:flex lg:hidden items-center justify-center pt-2 cursor-pointer'
        ref={ref}
        onTouchMove={() => {
          if (direction === 'down') {
            onClose && onClose();
          }
        }}
      >
        <SwiperIcon />
      </div>
      <div className='p-4 lg:flex items-center justify-between '>
        <div className='flex justify-end'>
          <IoMdClose
            onClick={onClose}
            role='button'
            className='text-gray-600 hover:text-gray-900'
          />
        </div>
        <div className='w-full'>{header}</div>
        <div />
      </div>
      <Separator />
    </div>
  );

  return (
    <Portal>
      <Drawer
        open={open || false}
        onClose={onClose}
        direction={rest.direction || 'right'}
        {...rest}
        style={
          isSmallScreen
            ? {
                border: 'none',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
              }
            : {}
        }
      >
        <div
          className={`flex h-full flex-col gap-4 ${containerProps?.className}`}
          {...containerProps}
        >
          <div>{renderHeader()}</div>

          <div className='p-4 flex-grow overflow-auto'>{children}</div>

          {footer && <div className='p-4'>{footer}</div>}
        </div>
      </Drawer>
    </Portal>
  );
};

export default MyDrawer;
