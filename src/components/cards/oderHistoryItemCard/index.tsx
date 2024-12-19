import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import restaurant from '@/assets/images/restaurant.jpg';
import Separator from '@/shared-ui/separator';
import Button from '@/shared-ui/button';
import { capitalizeFirstLetter, getFormattedDateTime } from '@/helpers';
import useSmallScreen from '@/hooks/useSmallScreen';
import { useState } from 'react';
import OrderDetailsDrawer from './orderDetailsDrawer';
import AnimationContainer from '@/shared-ui/animationContainer';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';

function OrderHistoryItemCard(item: any) {
  const [isOpen, setIsOpen] = useState(false);
  const isSmall = useSmallScreen();
  const foodItems = item?.items;

  const { date, time } = getFormattedDateTime(item?.createdAt);

  const renderStatus = () => {
    let className = 'px-3 py-1 bg-yellow-100 text-yellow-700 rounded-xl';

    switch (item?.orderStatus) {
      case 'PENDING':
        className = ' bg-yellow/10 text-yellow ';
        break;
      case 'COMPLETED':
        className = 'bg-green/10 text-green';
        break;
      default:
        className = 'bg-yellow/10 text-yellow';
    }

    return (
      <span className={`px-3 py-1  rounded-xl ${className}`}>
        {capitalizeFirstLetter(item?.orderStatus)}
      </span>
    );
  };

  const renderHeader = () => (
    <div>
      <div className='flex justify-between gap-3'>
        <div>
          <div className='flex gap-3'>
            <div>
              <img
                src={restaurant}
                alt=''
                className='w-[42px] h-[43px] rounded-lg'
              />
            </div>
            <div className='flex-grow'>
              <Text
                as='p'
                variant='small'
                className=' !text-primary !m-0 !p-0 !font-[500]'
              >
                {item?.storeName}
              </Text>
            </div>
          </div>
        </div>
        {!isSmall && <div>{renderButtons()}</div>}
      </div>
    </div>
  );

  const renderButtons = () => (
    <div className='flex gap-3 lg:flex-row xs:flex-col justify-between mt-auto'>
      <Button
        variant='secondary'
        className='!px-2 !py-2 !lg:w-[141.67px] xs:w-full  text-[15px]'
        onClick={() => setIsOpen(true)}
      >
        See Details
      </Button>
      <Button className='!px-2 !py-2 !lg:w-[141.67px] xs:w-full  text-[15px]'>
        Download Receipt
      </Button>
    </div>
  );

  const renderOrderDetails = () => (
    <div>
      <div className='flex justify-between gap-3 items-center'>
        <div className='flex flex-col'>
          <Text className='!m-0'>{item.correlationId}</Text>
          <Text variant='extra-small' className='!text-dark-5'>
            {date} at {time}
          </Text>
        </div>
        <Text>{renderStatus()}</Text>
      </div>
      <div className='mt-6'>
        <Text>Order Details</Text>
        <div className='mt-4'>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              Table Number
            </Text>
            <Text variant='small' className='!w-3/4'>
              {item.tableNumber || '-'}
            </Text>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              Total Price
            </Text>
            <Text variant='small' className='!w-3/4'>
              ${calculateTotal()}
            </Text>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              Items
            </Text>
            <Text variant='small' className='!w-3/4'>
              {foodItems && foodItems.length > 0
                ? foodItems.map((item: any) => item.englishName).join(', ')
                : '-'}
            </Text>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <Text>Customer Details</Text>
        <div className='mt-4'>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              Email
            </Text>
            <Text variant='small' className='!w-3/4'>
              {item.customerEmail}
            </Text>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              First Name
            </Text>
            <Text variant='small' className='!w-3/4'>
              {item.customerFirstName}
            </Text>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <Text variant='small' className='!text-dark-5 !w-1/3'>
              Last Name
            </Text>
            <Text variant='small' className='!w-3/4'>
              {item.customerLastName}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  const calculateTotal = () =>
    foodItems.reduce(
      (acc: number, item: any) => (acc += +item.price * +item.quantity),
      0
    );
  const calculateItems = () =>
    foodItems.reduce((acc: number, item: any) => (acc += item.quantity), 0);

  return (
    <Card header={renderHeader()} footer={isSmall ? renderButtons() : null}>
      <div className='flex flex-col h-full gap-3'>
        <Separator />
        <table className='table-auto w-full'>
          <thead className='hidden lg:table-header-group'>
            <tr className='text-dark-5'>
              <th className='text-left font-regular text-[12px]'>
                Order number
              </th>
              <th className='text-center font-regular text-[12px]'>
                Date & Time
              </th>
              <th className='text-center font-regular text-[12px]'>Status</th>
              <th className='text-center font-regular text-[12px]'>Items</th>
              <th className='text-center font-regular text-[12px]'>
                Total amount
              </th>
              <th className='text-center font-regular text-[12px]'>Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='flex lg:table-cell lg:text-left'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Order#:
                </Text>
                <Text variant='extra-small'>{item.correlationId}</Text>
              </td>
              <td className='flex lg:table-cell lg:text-center'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Date & Time:
                </Text>
                <Text variant='extra-small'>
                  {date} {time}
                </Text>
              </td>{' '}
              <td className='flex lg:table-cell lg:text-center'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Status:
                </Text>
                <Text variant='extra-small'>{renderStatus()}</Text>
              </td>
              <td className='flex lg:table-cell lg:text-center'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Items:
                </Text>
                <Text variant='extra-small'>{calculateItems()}</Text>
              </td>
              <td className='flex lg:table-cell lg:text-center'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Total amount:
                </Text>
                <Text variant='extra-small' className='font-[500]'>
                  ${calculateTotal()}
                </Text>
              </td>
              <td className='flex lg:table-cell lg:text-center'>
                <Text
                  variant='extra-small'
                  className='!text-dark-5  lg:hidden w-1/3'
                >
                  Paid:
                </Text>
                <Text variant='extra-small'>{item.paid ? 'Yes' : 'No'}</Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isOpen && !isSmall && (
        <OrderDetailsDrawer open={isOpen} onClose={() => setIsOpen(false)}>
          {renderOrderDetails()}
        </OrderDetailsDrawer>
      )}
      {isOpen && isSmall && (
        <FullScreenModal
          title='Order Details'
          onBack={() => {
            setIsOpen(false);
          }}
        >
          <AnimationContainer>{renderOrderDetails()}</AnimationContainer>
        </FullScreenModal>
      )}
    </Card>
  );
}

export default OrderHistoryItemCard;
