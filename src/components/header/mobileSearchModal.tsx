import MobileBackButton from '@/assets/svgs/mobileBackButton';
import Modal from '@/shared-ui/modal';
import Separator from '@/shared-ui/separator';
import Text from '@/shared-ui/text';
import TextField from '@/shared-ui/textfield';
import { CiSearch } from 'react-icons/ci';
import Search from '@/assets/svgs/search';

import useDisclosure from '@/hooks/useDisclosure';

function MobileSearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderHeader = () => (
    <div className=''>
      <div className='flex items-center gap-4 w-full'>
        <button onClick={onClose}>
          <MobileBackButton />
        </button>
        <Text as='p' variant='h6' className='!font-medium'>
          Search By Menu
        </Text>
      </div>
      <div className='mt-4'>
        <Separator />
      </div>
    </div>
  );

  return (
    <div>
      <div className='border-[2px] size-[48px] rounded-xl flex items-center justify-center'>
        <button
          onClick={onOpen}
          className='size-[42px] rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FD8064] to-[#FEA793]'
        >
          <Search />
        </button>
      </div>
      <Modal
        isFullScreen
        open={isOpen}
        onClose={onClose}
        header={renderHeader()}
        className={
          'w-full min-w-full min-h-[100vh] overflow-y-auto  m-0! bg-gray-1'
        }
      >
        <div className='my-4 h-[48px]'>
          <TextField endIcon={<CiSearch />} placeholder='Restaurant Name   ' />
          <div className='flex flex-wrap gap-2 mt-5'>
            {/* {MENU_LIST['Italian'].map((item, index) => (
              <FoodItemCard key={index} {...item} />
            ))} */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MobileSearchModal;
