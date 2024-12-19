import SectionCard from '@/components/cards/sectionCard';
import CartSummary from '@/components/cartSummary';
import PaymentCartItem from '@/components/paymentCartItem';
import { calculateCartTotal, formatNumberToCurrency } from '@/helpers';
import Separator from '@/shared-ui/separator';
import Text from '@/shared-ui/text';
import { useAppSelector } from '@/store/store';
import { useState } from 'react';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

interface Props {
  totalTax: number;
}

function CartSection({ totalTax }: Props) {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const quantity = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  const renderCartItems = () => {
    return (
      <div className='flex flex-col gap-4'>
        {cartItems.map((item) => (
          <PaymentCartItem key={item.uniqueId} {...item} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* PC */}
      <div className='lg:block xs:hidden'>
        <SectionCard heading='Cart' className='!w-full'>
          {renderCartItems()}
          <div className='my-5'>
            <Separator />
          </div>
          <CartSummary
            totalTax={totalTax}
            total={calculateCartTotal(cartItems)}
          />
        </SectionCard>
      </div>
      {/* Mobile */}
      <div className=' xs:block lg:hidden'>
        <div className='mb-2'>
          <Text variant='body' className='font-semibold'>
            Order
          </Text>
        </div>
        <div
          className='flex items-center gap-2'
          onClick={() => setIsCartOpen((prev) => !prev)}
          role='button'
        >
          <Text as={'h6'} variant='h6'>
            {quantity} items for{' '}
            {formatNumberToCurrency(calculateCartTotal(cartItems) || 0)}
          </Text>
          <div>
            {isCartOpen ? (
              <IoCaretUpSharp size={24} className='text-primary' />
            ) : (
              <IoCaretDownSharp size={24} className='text-secondary-text' />
            )}
          </div>
        </div>
        {isCartOpen && (
          <div className='mt-3'>
            <SectionCard className='border border-primary !rounded-2xl !pt-0 !pb-3 !px-3'>
              {renderCartItems()}
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSection;
