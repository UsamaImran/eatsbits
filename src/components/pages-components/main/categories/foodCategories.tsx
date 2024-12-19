import useTopListings from '@/api/restaurants/useTopListings';
import { getImageURL } from '@/helpers';
import useSmallScreen from '@/hooks/useSmallScreen';
import Card from '@/shared-ui/card';
import Skeleton from '@/shared-ui/skeleton';
import DynamicSwiper from '@/shared-ui/swiper';

import Text from '@/shared-ui/text';

function FoodCategories() {
  const isSmall = useSmallScreen();
  const { data, isLoading } = useTopListings();

  return (
    <div className='flex flex-col gap-5 '>
      <div>
        <Text variant='h1'>Categories</Text>
      </div>

      {isLoading && renderSkeleton()}
      <DynamicSwiper
        // pagination={undefined}
        effect={'cube'}
        slidesPerView={isSmall ? 1 : 3}
        slides={data?.topListing.topCategories || []}
        keyExtractor={(_, index) => index}
        renderSlide={(item: any, index) => (
          <div
            key={index}
            className='lg:w-[400px] h-[300px] xs:w-full'
            role='button'
          >
            <RenderCategoryItem {...item} />
          </div>
        )}
      />
    </div>
  );
}

export default FoodCategories;

const renderSkeleton = () => (
  <div className='flex flex-wrap gap-1'>
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className='xs:w-[108.33px] lg:w-[323px] cursor-pointer m-0 border-gray-200 border-2 p-10 rounded-xl'
      >
        <Skeleton type='image' className='border-0 ' />
        <Skeleton type='text' className='border-0 ' />
      </div>
    ))}
  </div>
);

const RenderCategoryItem = (itemInfo: Record<string, any>) => {
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
          <div className='flex items-center justify-center'>
            <Text>{itemInfo.name}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
