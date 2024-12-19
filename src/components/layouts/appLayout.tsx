import Header from '../header';
import Layout from './layout';
import Footer from '../footer';
import { PropsWithChildren } from 'react';
import AnimationContainer from '@/shared-ui/animationContainer';

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col  bg-gray-1 min-h-[100vh]'>
      <div className='sticky top-0 z-[10] bg-inherit shadow-sm'>
        <Header />
      </div>
      <div>
        <Layout>
          <AnimationContainer>{children}</AnimationContainer>
        </Layout>
      </div>
      <div className='mt-auto mb-2'>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
