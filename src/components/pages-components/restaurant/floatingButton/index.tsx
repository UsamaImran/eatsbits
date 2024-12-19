import Button from '@/shared-ui/button';
import { openCart } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { FaShoppingCart } from 'react-icons/fa';

const FloatingButton = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const numberOfItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='sticky bottom-4 right-4 flex justify-end  '>
      <Button
        variant='primary'
        className={` rounded-full   px-4 py-2 shadow-md transition-all duration-500 hover:scale-150 `}
        onClick={() => dispatch(openCart())}
      >
        <FaShoppingCart className='w-[50px] h-[25px]' />
        <span className='absolute top-0 right-0 bg-red text-white rounded-full size-[20px] flex items-center justify-center text-xs font-bold'>
          {numberOfItems}
        </span>
      </Button>
    </div>
  );
};

export default FloatingButton;
