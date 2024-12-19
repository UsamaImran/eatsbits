import SectionCard from '@/components/cards/sectionCard';
import { MdOutlineEdit } from 'react-icons/md';
import { useState } from 'react';
import Text from '@/shared-ui/text';
import EditAddress from '../editAddress';
import useSmallScreen from '@/hooks/useSmallScreen';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';
import { useAppSelector } from '@/store/store';
import { getObjectKeys } from '@/helpers';

function AddressSection() {
  const isSmallScreen = useSmallScreen();
  const [isEdit, setIsEdit] = useState(false);

  const renderPCVersion = () => (
    <div>
      <EditAddress onSave={setIsEdit} />
    </div>
  );

  const renderMobileVersion = () => (
    <div>
      {isSmallScreen && (
        <FullScreenModal title='Edit Address' onBack={() => setIsEdit(false)}>
          <div className='px-3 mt-5'>
            <EditAddress onSave={setIsEdit} />
          </div>
        </FullScreenModal>
      )}
    </div>
  );

  const renderAddress = () => (
    <div>
      <div>
        <Text className='text-[18px] lg:hidden xs:block font-semibold'>
          Address Details
        </Text>
      </div>
      {isEdit ? (
        <div>
          {renderPCVersion()}
          {renderMobileVersion()}
        </div>
      ) : (
        <div className='flex gap-5 lg:flex-row xs:flex-col  '>
          <div className='flex-grow h-[135px]' role='button'>
            <AddressCard isEdit={isEdit} onEdit={() => setIsEdit(true)} />
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div className='w-full xs:block lg:flex justify-center'>
      <div className='xs:hidden lg:block'>
        <SectionCard heading='Address'>{renderAddress()}</SectionCard>
      </div>
      <div className='xs:block lg:hidden'>{renderAddress()}</div>
    </div>
  );
}

export default AddressSection;

interface IAddressCardProps {
  isEdit?: boolean;
  onEdit: () => void;
}

const AddressCard = ({ onEdit }: IAddressCardProps) => {
  const userAddress = useAppSelector((state) => state.user.userData?.address);

  const isAddressPresent =
    userAddress && getObjectKeys(userAddress).some((key) => !!userAddress[key]);

  return (
    <div className='border-[1px] border-gray-1 p-3 rounded-2xl flex flex-col gap-1 min-h-[135px] bg-white'>
      <div className='flex justify-end'>
        <div>
          <MdOutlineEdit
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className='text-primary'
          />
        </div>
      </div>
      <div>
        {isAddressPresent ? (
          <div className='flex flex-col'>
            <Text className='!text-[16px] font-[500]'>{`${userAddress?.addressLine1} `}</Text>
            <Text className='!text-[16px] font-[500]'>{` ${userAddress?.addressLine2} `}</Text>
            <Text className='!text-[14px] '>{`${userAddress?.city || ''}
${
  userAddress?.state ? (userAddress?.city ? ', ' : '') + userAddress?.state : ''
}
${
  userAddress?.zipCode
    ? (userAddress?.city || userAddress?.state ? ', ' : '') +
      userAddress?.zipCode
    : ''
}`}</Text>
          </div>
        ) : (
          <span className='bg-gray-200 px-4 py-2 w-auto rounded-2xl'>
            No Address Added yet
          </span>
        )}
      </div>
    </div>
  );
};
