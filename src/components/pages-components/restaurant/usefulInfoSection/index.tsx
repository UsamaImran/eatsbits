import Accordion from '@/shared-ui/accordoin';
import Text from '@/shared-ui/text';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const USEFUL_INFO_OPTIONS = [
  {
    name: 'About company',
    icon: <IoMdInformationCircleOutline size='24px' />,
  },
  {
    name: 'Cookie Policy',
    icon: <IoMdInformationCircleOutline size='24px' />,
  },
  {
    name: 'Terms of Use',
    icon: <IoMdInformationCircleOutline size='24px' />,
  },
  {
    name: 'Privacy Policy',
    icon: <IoMdInformationCircleOutline size='24px' />,
  },
];

function UsefulInfoSection() {
  return (
    <div className='mt-5'>
      <div>
        <Text as={'div'} variant='body'>
          Useful information
        </Text>
      </div>
      <div className='flex flex-wrap -mx-2 mt-5'>
        {USEFUL_INFO_OPTIONS.map((option, index) => (
          <div
            key={index}
            role='button'
            onClick={() => {}}
            className='w-full lg:w-1/2 px-1 py-1'
          >
            <Accordion
              title={
                <div className='flex items-center gap-2'>
                  {option.icon}
                  <Text className='!m-0 !p-0 text-[12px]'> {option.name}</Text>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsefulInfoSection;
