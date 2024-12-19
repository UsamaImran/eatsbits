import TextField from '@/shared-ui/textfield';
import SectionCard from '../../../cards/sectionCard';
import { MdOutlineEdit } from 'react-icons/md';
import { RiVisaLine } from 'react-icons/ri';
import Button from '@/shared-ui/button';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import EditCardInfo from '../editCardInfo';
import Text from '@/shared-ui/text';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';
import useSmallScreen from '@/hooks/useSmallScreen';

function CardsSection() {
  const [isEdit, setIsEdit] = useState(false);
  const isSmallScreen = useSmallScreen();

  const renderPCVersion = () => (
    <div className='xs:hidden lg:block'>
      <EditCardInfo onSave={() => setIsEdit(false)} />
    </div>
  );

  const renderMobileVersion = () => (
    <div className='xs:block lg:hidden  h-full'>
      {isSmallScreen && (
        <FullScreenModal
          title='Edit Card Details'
          onBack={() => setIsEdit(false)}
        >
          <div className='px-3 h-full mt-5'>
            <EditCardInfo onSave={() => setIsEdit(false)} />
          </div>
        </FullScreenModal>
      )}
    </div>
  );

  const renderSection = () => (
    <div className='flex flex-col gap-4'>
      <div>
        <Text className='xs:block lg:hidden text-[18px] font-semibold'>
          Cards
        </Text>
      </div>
      {isEdit ? (
        <div className=''>
          {renderPCVersion()}
          {renderMobileVersion()}
        </div>
      ) : (
        <TextField
          startIcon={<RiVisaLine size={40} />}
          endIcon={
            <MdOutlineEdit
              onClick={() => setIsEdit(true)}
              className='text-primary cursor-pointer'
            />
          }
        />
      )}
      <div>
        <Button
          variant='tertiary'
          startIcon={<IoMdAdd />}
          className='xs:bg-transparent lg:bg-white !text-primary font-semibold px-0'
        >
          Add New Card
        </Button>
      </div>
    </div>
  );

  return (
    <div className='w-full xs:block lg:flex justify-center'>
      <div className='xs:hidden lg:block'>
        <SectionCard heading='Cards'>{renderSection()}</SectionCard>
      </div>
      <div className='xs:block lg:hidden'>{renderSection()}</div>
    </div>
  );
}

export default CardsSection;
