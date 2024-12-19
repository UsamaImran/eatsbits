import CartItemCard from '@/components/cards/cartItemCard';
import Button from '@/shared-ui/button';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { closeCart, setComment } from '@/store/slices/cartSlice';
import Text from '@/shared-ui/text';
import TextArea from '@/shared-ui/textArea';
import { getImageURL } from '@/helpers';

function CartDrawer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const comment = useAppSelector((state) => state.cart.comment);

  const cartItems = useAppSelector((state) => state.cart.items);
  const orderType = useAppSelector((state) => state.cart.orderType);

  return (
    <div className='flex flex-col h-full gap-5'>
      <div>
        <Text as={'h6'} variant='h6' className='!font-[500]'>
          Check Order (<span className='text-dark-2'>{orderType.title}</span>)
        </Text>
      </div>
      <div className='flex flex-col gap-3 '>
        {cartItems.map((item) => (
          <CartItemCard
            key={item.uniqueId}
            {...item}
            bucketKeyName={
              item.bucketKeyName
                ? getImageURL(item.bucketKeyName)
                : 'https://picsum.photos/200/300'
            }
          />
        ))}
      </div>
      <div>
        <TextArea
          value={comment}
          label='Comment for the restaurant'
          labelStyle={'text-[24px] !text-primary-text font-semibold'}
          placeholder='Leave comment here'
          onChange={({ target: { value } }) => {
            dispatch(setComment(value));
          }}
        />
      </div>
      <div className='mt-auto'>
        <div className='flex justify-between mt-5 w-full'>
          <div className='xs:hidden lg:block'>
            <Button
              onClick={() => {
                dispatch(closeCart());
              }}
              variant='tertiary'
              className='!bg-[#F5F5F6] text-primary-text lg:w-[214px] '
            >
              Cancel
            </Button>
          </div>
          <div className='lg:w-[214px] xs:w-full'>
            <Button
              disabled={!cartItems.length}
              className='w-full'
              onClick={() => {
                dispatch(closeCart());
                navigate('payment');
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
