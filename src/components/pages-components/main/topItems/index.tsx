import useTopListings from '@/api/restaurants/useTopListings';
import { formatNumberToCurrency, getImageURL } from '@/helpers';
import useSmallScreen from '@/hooks/useSmallScreen';
import Card from '@/shared-ui/card';
import Skeleton from '@/shared-ui/skeleton';
import DynamicSwiper from '@/shared-ui/swiper';
import Text from '@/shared-ui/text';
import { useNavigate } from 'react-router-dom';

function TopItems() {
  const navigate = useNavigate();
  const { data, isLoading } = useTopListings();
  const isSmall = useSmallScreen();

  const topItems = data?.topListing.topItems;

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <Text variant='h1'>Top Items</Text>
      </div>
      <div>
        {isLoading && renderSkeleton(3)}
        <DynamicSwiper
          // pagination={undefined}
          effect={'cube'}
          slidesPerView={isSmall ? 1 : 3}
          slides={topItems}
          keyExtractor={(_, index) => index}
          renderSlide={(item: any, index) => (
            <div
              className='h-[310px]'
              key={index}
              role='button'
              onClick={() =>
                navigate(
                  `restaurant/${item.storeCorrelationId}?item=${item.correlationId}`
                )
              }
            >
              <RenderTopItem {...item} />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default TopItems;

const RenderTopItem = (itemInfo: Record<string, any>) => {
  return (
    <Card className='!p-0 overflow-hidden cursor-pointer h-full'>
      <div className='flex flex-col gap-5'>
        <img
          src={
            itemInfo?.bucketKeyName ? getImageURL(itemInfo.bucketKeyName) : ''
          }
          alt='image'
          className='h-[222px] w-full object-contain bg-gray-50'
        />
        <div className='px-4'>
          <div className='flex items-center justify-between'>
            <Text>{itemInfo.englishName}</Text>
            <div className='flex items-center gap-2'>
              <Text>{formatNumberToCurrency(+itemInfo.price)}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const renderSkeleton = (length = 3) => (
  <div className='xs:hidden lg:flex flex-wrap gap-2 '>
    {[...Array(length)].map((_, index) => (
      <div
        key={index}
        className='lg:w-[429.33px] h-[319px] xs:w-full border-2 border-gray-200 rounded-xl flex flex-col gap-3'
      >
        <Skeleton type='image' className='border-0 flex-grow' />
        <Skeleton type='text' className='border-0 flex-1' />
      </div>
    ))}
  </div>
);
