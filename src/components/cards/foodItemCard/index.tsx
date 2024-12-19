import Card from '@/shared-ui/card';
import FoodItemImg from '@/assets/images/foodItem.jpg';
import LikeIcon from '@/assets/svgs/likeIcon';
import Text from '@/shared-ui/text';
import { formatNumberToCurrency, getImageURL } from '@/helpers';
import { FoodItem } from '@/types';
import FoodItemQuantityCounter from './FoodItemQuantityCounter';
import Button from '@/shared-ui/button';

interface Props extends Partial<FoodItem> {
  onAddToCart?: (quantity: number) => void;
  displayDetails?: boolean;
  containerProps?: React.ComponentProps<typeof Card>;
}

function FoodItemCard({
  englishDescription,
  englishName,
  price,
  displayDetails = false,
  bucketKeyName,
  nonEnglishDescription,
  nonEnglishName,
  onAddToCart,
  containerProps,
  itemOptions,
}: Props) {
  const info = {
    name: displayDetails
      ? `${englishName} ${nonEnglishName ? `(${nonEnglishName})` : ''}`
      : englishName || nonEnglishName || '',
    description: displayDetails
      ? `${englishDescription || ''} ${
          nonEnglishDescription ? `(${nonEnglishDescription})` : ''
        }`
      : englishDescription || nonEnglishDescription || '',
  };

  const hasOptions = !!itemOptions?.length;

  return (
    <Card
      className={`  lg:!w-[429.33px] !h-[316px]  xs:!w-full  overflow-hidden cursor-pointer p-[12px]  ${containerProps?.className}`}
      {...containerProps}
    >
      <div className='flex flex-col gap-3 h-full'>
        <div className='relative w-full flex justify-center'>
          <div className='relative w-[246px] h-[140px]  border-gray-300 rounded-md'>
            <img
              src={bucketKeyName ? getImageURL(bucketKeyName) : FoodItemImg}
              alt='food item'
              className='w-full h-full object-contain  rounded-md'
            />
          </div>{' '}
          <span className='absolute right-0'>
            <LikeIcon />
          </span>
        </div>
        <div className={`flex  justify-between`}>
          <Text
            variant='small'
            className={`font-[500] !text-[14px] ${
              displayDetails ? '' : 'text-nowrap overflow-hidden mr-5'
            } `}
          >
            {info.name}
          </Text>
          <Text
            variant='small'
            className='text-primary-text text-[14px] font-[500]'
          >
            {formatNumberToCurrency(price ? +price : 0) || '$15.50'}
          </Text>
        </div>
        <div
          className={`${
            !displayDetails ? 'h-[100px] overflow-hidden truncate' : ''
          }  `}
        >
          <Text variant='extra-small' className='!text-[12px] '>
            {info.description}
          </Text>
        </div>

        {displayDetails ? (
          !hasOptions && <FoodItemQuantityCounter onAddToCart={onAddToCart} />
        ) : (
          <div className='flex justify-between '>
            <Button
              variant='tertiary'
              className='!bg-gray-2 text-primary-text !text-[15px] !w-[195.67px] '
            >
              View Details
            </Button>
            <Button
              className='!flex-grow !w-[195.67px] !text-[15px]'
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart && onAddToCart(1);
              }}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default FoodItemCard;
