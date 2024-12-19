import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, React.ComponentProps<'div'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

function Card({ children, header, footer, className, ...rest }: Props) {
  return (
    <div
      className={`border-border-gray border-2 h-full rounded-2xl p-4 w-full bg-white hover:shadow-md ${className}`}
      {...rest}
    >
      <div className='flex h-full flex-col gap-3'>
        {header && <div>{header}</div>}
        <div className='h-full'>{children}</div>
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}

export default Card;
