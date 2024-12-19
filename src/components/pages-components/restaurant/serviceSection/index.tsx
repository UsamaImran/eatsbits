import useRestaurant from '@/api/restaurants/useRestaurant';
import { SERVICES } from '@/constants';
import { convertToDayAbbreviation, formatTime, getToday } from '@/helpers';
import MyRadioGroup from '@/shared-ui/radioGroup';
import Text from '@/shared-ui/text';
import { setOderType } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

function ServiceSection() {
  const { data } = useRestaurant();
  const dispatch = useAppDispatch();
  const orderType = useAppSelector((state) => state.cart.orderType);

  const today = getToday();
  const operationHours = (data?.stores[0]?.operationHours as any[]) || [];

  const serviceData = SERVICES.map((item) => ({
    ...item,
    timing:
      formatTime(
        operationHours.find((i) => convertToDayAbbreviation(i.day) === today)
          ?.startHour
      ) +
      ' - ' +
      formatTime(
        operationHours.find((i) => convertToDayAbbreviation(i.day) === today)
          ?.endHour
      ),
  }));

  return (
    <div className='lg:mb-10 xs:mb-5 mt-5 lg:mt-8'>
      <MyRadioGroup
        onSelect={(val) =>
          dispatch(setOderType({ title: val.title, value: val.value }))
        }
        items={serviceData}
        defaultSelected={
          SERVICES.find((item) => item.value === orderType?.value) ||
          SERVICES[0]
        }
        keyExtractor={(item) => item.value}
        comparisonKey={'value'}
        renderItem={(item, selected) => (
          <div
            className={`flex flex-col items-center justify-center lg:w-[194.67px] xs:w-full p-4 rounded-3xl shadow-md ${
              selected
                ? 'bg-primary data-[checked]:bg-primary'
                : 'bg-white data-[checked]:text-white'
            } `}
          >
            <item.icon
              size={25}
              className={`${selected ? 'text-white' : ''}`}
            />
            <Text
              variant='small'
              className={`text-inherit font-semibold !mb-0 ${
                selected ? 'text-white' : ''
              }`}
            >
              {item.title}
            </Text>
            <Text
              variant='extra-small'
              className={`text-inherit text-left  xs:text-[12px] lg:text-[14px] !mb-0 ${
                selected ? 'text-white' : ''
              } `}
            >
              {item.timing}
            </Text>
          </div>
        )}
      />
    </div>
  );
}

export default ServiceSection;
