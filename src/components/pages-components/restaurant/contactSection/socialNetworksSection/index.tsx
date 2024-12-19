import Button from '@/shared-ui/button';
import Text from '@/shared-ui/text';
import { PiFacebookLogoBold } from 'react-icons/pi';
import { FaInstagram } from 'react-icons/fa';

function SocialNetworksSection() {
  return (
    <div>
      <div>
        <Text as={'div'} variant='body' className='!text-[20px] text-dark-1'>
          We are on social networks
        </Text>
      </div>
      <div className='flex gap-1'>
        <div className='lg:w-full xs:w-[50%]'>
          <Button
            variant='tertiary'
            className='bg-transparent !text-primary-text py-3 border-[1px] w-full flex items-center justify-center gap-1 '
          >
            <PiFacebookLogoBold size='24px' />
            <Text className='!m-0 !p-0'>Facebook</Text>
          </Button>
        </div>
        <div className='lg:w-full xs:w-[50%]'>
          <Button
            variant='tertiary'
            className='bg-transparent !text-primary-text py-3 border-[1px] w-full flex items-center justify-center gap-1 !xs:w-full'
          >
            <FaInstagram size='24px' />
            <Text className='!m-0 !p-0'>Instagram</Text>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SocialNetworksSection;
