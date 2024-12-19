import useRestaurant from '@/api/restaurants/useRestaurant';
import { formatPhoneNumber } from '@/helpers';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineLocalPhone } from 'react-icons/md';

function ContactFieldsSection() {
  const { data } = useRestaurant();

  const address = data?.stores[0].address || {};

  const fullAddress = `${address?.addressLine1 || ''} ${
    address?.addressLine2 || ''
  }, ${address?.city || ''}, ${address?.state || ''}`;

  const contactNumber = data?.stores[0]?.primaryContactPhoneNumber || '';
  return (
    <div>
      <div>
        <Text as={'div'} variant='body' className='!text-[20px]'>
          Contacts
        </Text>
      </div>
      <div className='flex flex-col lg:flex-row gap-2 lg:gap-2'>
        <Card className='!border-1'>
          <div className='flex gap-2 items-center'>
            <div>
              <IoLocationOutline size={18} />
            </div>
            <Text variant='small' className='!m-0 !text-[12px] lg:!text-[16px]'>
              {fullAddress}
            </Text>
          </div>
        </Card>
        <Card className='!border-1'>
          <div className='flex gap-2 items-center'>
            <div>
              <MdOutlineLocalPhone size={18} />
            </div>
            <Text variant='small' className='!m-0 !text-[12px] lg:!text-[16px]'>
              {formatPhoneNumber(contactNumber)}
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ContactFieldsSection;
