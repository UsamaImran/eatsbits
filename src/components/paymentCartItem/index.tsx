import { formatNumberToCurrency } from '@/helpers';
import Text from '@/shared-ui/text';
import { CartItem } from '@/store/slices/cartSlice';

function PaymentCartItem(item: CartItem) {
  const totalPrice =
    +item.price +
    (!!item?.itemOptions?.length
      ? (item?.itemOptions?.reduce(
          (acc, item) =>
            acc +
            (item?.itemOptionElements?.reduce(
              (ac, i) => ac + (+i.price || 0),
              0
            ) ?? 0),
          0
        ) ??
          0) ||
        1
      : 0);

  return (
    <div key={item.correlationId}>
      <div className='flex justify-between items-center'>
        <Text variant='extra-small' className='text-secondary-text !mb-0'>
          {item.englishName}
        </Text>
        <Text variant='small' className='!text-primary'>
          {item.quantity}x
        </Text>
      </div>
      <Text variant='extra-small' className='!text-[12px]'>
        {formatNumberToCurrency(totalPrice)}
      </Text>
    </div>
  );
}

export default PaymentCartItem;
