import Card from '@/shared-ui/card';
import restaurantImage from '@/assets/images/restaurant.jpg';
import Text from '@/shared-ui/text';
import Rating from '@/assets/svgs/rating';
import LocationIcon from '@/assets/svgs/locationIcon';

interface Props {
  name: string;
  rating: string;
  location: string;
  image: string;
}

function RestaurantCard({ name, rating, image }: Partial<Props>) {
  return (
    <Card className=' !p-0 overflow-hidden cursor-pointer'>
      <div className='flex flex-col gap-5'>
        <img
          src={image || restaurantImage}
          alt='image'
          className='h-[222px] w-full object-cover'
        />
        <div className='px-4'>
          <div className='flex items-center justify-between'>
            <Text>{name}</Text>
            <div className='flex items-center gap-2'>
              <Rating />
              <Text className='!m-0'>{rating}</Text>
            </div>
          </div>
          <div className='flex items-center gap-2 mb-3'>
            <div>
              <LocationIcon />
            </div>
            <Text variant='small' className='text-secondary-text !m-0'>
              Kulas Mews, Nolanburgh
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RestaurantCard;
