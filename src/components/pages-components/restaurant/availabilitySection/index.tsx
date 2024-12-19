import useRestaurant from '@/api/restaurants/useRestaurant';
import { convertToDayAbbreviation, formatTime } from '@/helpers';
import Text from '@/shared-ui/text';

function AvailabilitySection() {
  const { data } = useRestaurant();

  const operationHours = (data?.stores[0]?.operationHours as any[]) || [];

  return (
    <div className='mt-5'>
      <div>
        <Text as={'div'} className='font-[500] text-dark-1'>
          Working hours
        </Text>
      </div>
      <div className='flex flex-col gap-2'>
        {operationHours?.map((item, index) => (
          <div
            key={index}
            className='flex items-center lg:justify-normal xs:justify-between gap-5'
          >
            <div className='lg:w-[20%] xs:w-[50%]'>
              <Text variant='small' className='!text-dark-1 font-[400]'>
                {convertToDayAbbreviation(item?.day)}
              </Text>
            </div>
            <div className=''>
              <Text variant='small' className='!font-[500]'>
                {formatTime(item?.startHour)} - {formatTime(item?.endHour)}
              </Text>
            </div>
            <div className='lg:w-[55%] xs:hidden' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailabilitySection;
