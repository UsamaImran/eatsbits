import SectionCard from '@/components/cards/sectionCard';
import { SERVICES } from '@/constants';
import Select from '@/shared-ui/select';

import Text from '@/shared-ui/text';
import { setOderType } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

function DeliveryMethodSection() {
  const orderType = useAppSelector((state) => state.cart.orderType);
  const dispatch = useAppDispatch();

  const renderSection = () => {
    return (
      <>
        <Select
          value={SERVICES.find((service) => service.value === orderType.value)}
          className={'!w-full bg-white'}
          buttonProps={{ className: 'w-full !h-[52px]' }}
          optionsList={SERVICES}
          renderOption={(i) => (
            <p className='flex items-center gap-3'>
              {<i.icon />}
              {i.title}
            </p>
          )}
          uniqueKey={'value'}
          onSelect={(value) =>
            dispatch(setOderType({ title: value.title, value: value.value }))
          }
        />
      </>
    );
  };
  return (
    <div>
      {/* PC */}
      <div className='lg:block xs:hidden'>
        <SectionCard heading='Delivery Method' className='!w-full'>
          {renderSection()}
        </SectionCard>
      </div>
      {/* Mobile */}
      <div className=' xs:block lg:hidden'>
        <div className='mb-2'>
          <Text variant='body' className='font-semibold'>
            Delivery Method
          </Text>
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

export default DeliveryMethodSection;
