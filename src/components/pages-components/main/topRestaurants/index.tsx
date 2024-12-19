import useTopListings from '@/api/restaurants/useTopListings';
import RestaurantCard from '@/components/cards/restaurantCard';
import { getImageURL } from '@/helpers';
import Skeleton from '@/shared-ui/skeleton';
import DynamicSwiper from '@/shared-ui/swiper';
import Tabs from '@/shared-ui/tabs';
import Text from '@/shared-ui/text';
import { useNavigate } from 'react-router-dom';

function TopRestaurants() {
  const { data, isLoading } = useTopListings();

  const navigate = useNavigate();

  const list = (data?.topListing?.topStores as any[]) || [];
  const categories = [...new Set(list.map((item) => item?.style))];

  const renderCategory = (category: string) => (
    <div>
      {/* PC */}
      <div className='xs:hidden lg:flex flex-wrap gap-2 '>
        {isLoading && renderSkeleton(3)}
        {list
          ?.filter((item) => item.style === category)
          .map((item: any, index: number) => (
            <div
              className='lg:w-[429.33px] h-[319px] xs:w-full'
              key={index}
              role='button'
              onClick={() => navigate(`restaurant/${item?.correlationId}`)}
            >
              <RestaurantCard
                key={index}
                name={item.name}
                rating={item?.averageRating}
                image={
                  item?.bucketKeyName ? getImageURL(item?.bucketKeyName) : ''
                }
              />
            </div>
          ))}
      </div>

      {/* Mobile */}
      <div className='xs:block lg:hidden'>
        {isLoading && renderSkeleton(1)}
        <DynamicSwiper
          // pagination={undefined}
          effect={'cube'}
          slides={list?.filter((item) => item.style === category)}
          keyExtractor={(_, index) => index}
          renderSlide={(item: any) => (
            <div
              role='button'
              onClick={() => navigate(`restaurant/${item?.correlationId}`)}
            >
              <RestaurantCard
                name={item.name}
                rating={item?.averageRating}
                image={
                  item?.bucketKeyName ? getImageURL(item?.bucketKeyName) : ''
                }
              />
            </div>
          )}
        />
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-5 mb-5  '>
      <div>
        <Text variant='h1'>Top Restaurants</Text>
      </div>

      <div>
        <Tabs
          tabsData={categories?.map((category, index) => ({
            id: index + 1,
            title: category,
            component: renderCategory(category),
          }))}
        />
      </div>
    </div>
  );
}

export default TopRestaurants;

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
