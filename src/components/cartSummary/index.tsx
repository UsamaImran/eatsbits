import useCreateCustomerOrder from '@/api/restaurants/useCreateCustomerOrder';
import { formatNumberToCurrency } from '@/helpers';
import useSmallScreen from '@/hooks/useSmallScreen';
import Button from '@/shared-ui/button';
import CheckboxField from '@/shared-ui/checkbox';
import Loader from '@/shared-ui/loader';
import Text from '@/shared-ui/text';

interface CartSummaryProps {
  total: number;
  totalTax: number;
}

function CartSummary({ total, totalTax }: CartSummaryProps) {
  const { mutate: createCustomerOrder, isPending } = useCreateCustomerOrder();

  const isSmall = useSmallScreen();
  const sectionClassNames = isSmall ? 'bg-gray-3 rounded-lg p-3 mb-1' : '';

  const handleCreateCustomerOrder = () => {
    createCustomerOrder();
  };

  return (
    <div>
      <div className={`flex justify-between ${sectionClassNames}`}>
        <Text variant='small' className='text-secondary-text !text-[12px]'>
          Total
        </Text>
        <Text variant='small' className='text-secondary-text !text-[12px]'>
          {formatNumberToCurrency(total || 0)}
        </Text>
      </div>
      <div className={`flex justify-between ${sectionClassNames}`}>
        <Text
          variant='extra-small'
          className='text-secondary-text !text-[12px]'
        >
          Extimated Tax
        </Text>
        <Text variant='small' className='text-secondary-text !text-[12px]'>
          {formatNumberToCurrency(totalTax || 0)}
        </Text>
      </div>
      <div
        className={`flex justify-between ${
          !isSmall && 'mt-3'
        } ${sectionClassNames}`}
      >
        <Text variant='extra-small' className='!text-black !font-semibold'>
          Total
        </Text>
        <Text variant='extra-small' className='!text-black !font-semibold'>
          {formatNumberToCurrency(total + totalTax)}
        </Text>
      </div>
      <div className='mt-4 mb-3'>
        <CheckboxField />
      </div>
      <Button
        disabled={isPending}
        className='w-full'
        onClick={handleCreateCustomerOrder}
      >
        Proceed to Payment &nbsp;
        {isPending && <Loader className='!border-gray-400 size-[15px]' />}
      </Button>
    </div>
  );
}

export default CartSummary;
