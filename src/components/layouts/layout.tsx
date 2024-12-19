import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className=' border-gray-100  max-w-[1440px] mx-auto'>
      <div className='max-w-[1328px] w-full mx-auto px-3'>{children}</div>
    </div>
  );
}

export default Layout;
