import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface Props extends React.ComponentProps<typeof DialogPanel> {
  open: boolean;
  onClose: (val: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  isFullScreen?: boolean;
  zIndex?: string;
}

export default function Modal({
  children,
  header,
  footer,
  open,
  onClose,
  isFullScreen,
  zIndex,

  ...rest
}: Props) {
  return (
    <Dialog
      open={open}
      as='div'
      className={`relative focus:outline-none z-[10]  ${zIndex}`}
      onClose={onClose}
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30 ' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
        <div
          className={`flex min-h-full items-center justify-center  ${
            isFullScreen ? '' : 'p-4'
          }`}
        >
          <DialogPanel
            transition
            {...rest}
            className={`w-full max-w-lg  ${
              isFullScreen ? 'rounded-none p-0' : 'rounded-xl'
            } p-6 backdrop-blur-2xl duration-100 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-white  ${
              rest.className
            }`}
          >
            <div className='flex flex-col h-full'>
              <DialogTitle
                as='h3'
                className='flex items-center justify-between font-medium shrink-0'
              >
                <div className={`${isFullScreen ? 'w-full' : ''} `}>
                  {header}
                </div>
                <div
                  className={`${
                    isFullScreen
                      ? 'hidden'
                      : 'size-[auto] bg-gray-2 p-2 rounded-full'
                  }`}
                >
                  <IoMdClose role='button' onClick={() => onClose(false)} />
                </div>
              </DialogTitle>

              <div
                className={`h-full flex-grow ${!isFullScreen ? 'p-6' : 'p-0'} `}
              >
                {children}
              </div>
              {footer && <div className='mt-auto'>{footer}</div>}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
