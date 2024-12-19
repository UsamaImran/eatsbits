import { formatNumberToCurrency } from '@/helpers';
import Button from '@/shared-ui/button';
import Card from '@/shared-ui/card';
import Text from '@/shared-ui/text';
import {
  CartItem,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/store';

import { IoCloseCircleOutline } from 'react-icons/io5';

function CartItemCard(data: CartItem) {
  const dispatch = useAppDispatch();
  const { bucketKeyName, englishName, price, quantity } = data;

  const handleIncrement = () => {
    dispatch(incrementQuantity(data.uniqueId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(data.uniqueId));
  };

  const removeHandler = () => dispatch(removeFromCart(data.uniqueId));

  const totalPrice =
    (+price +
      (!!data?.itemOptions?.length
        ? data?.itemOptions?.reduce(
            (acc, item) =>
              (acc += item?.itemOptionElements
                ? item.itemOptionElements?.reduce(
                    (ac, i) => (ac += +i.price),
                    0
                  )
                : 0),
            0
          )
        : 0)) *
    quantity;

  return (
    <Card className='relative !w-full !min-h-[80.2px] !p-[12px] lg:w-full xs:w-[358px]'>
      <div className='flex items-center justify-between border-gray-200'>
        <div className='flex items-center'>
          <img
            src={bucketKeyName}
            alt={englishName}
            className='w-[65px] h-[56.2px] object-contain bg-no-repeat rounded-md'
          />
          <div className='ml-4 flex flex-col'>
            <Text variant='extra-small'>{englishName}</Text>
            <Text variant='small' className='text-gray-500'>
              {formatNumberToCurrency(totalPrice)}
            </Text>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='tertiary'
            className=' hover:text-gray-700 !bg-[#F5F5F6] px-4 text-primary-text size-[32px]'
            onClick={handleDecrement}
          >
            -
          </Button>
          <span className='mx-2'>{quantity}</span>
          <Button
            variant='tertiary'
            className=' hover:text-gray-700 px-4 !bg-[#F5F5F6] text-primary-text size-[32px]'
            onClick={handleIncrement}
          >
            +
          </Button>
        </div>
        <span
          className='absolute -top-1 -right-1'
          role='button'
          onClick={removeHandler}
        >
          <IoCloseCircleOutline />
        </span>
      </div>
    </Card>
  );
}

export default CartItemCard;
