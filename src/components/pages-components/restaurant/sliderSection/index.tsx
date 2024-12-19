import DynamicSwiper from '@/shared-ui/swiper';
import restaurantImage from '@/assets/images/restaurant2.jpeg';
import Text from '@/shared-ui/text';
import Rating from '@/assets/svgs/rating';
import LocationIcon from '@/assets/svgs/locationIcon';
import { getImageURL } from '@/helpers';

function SliderSection({
  imageUrl,
  name,
  address,
}: {
  imageUrl: string;
  name: string;
  address: Object;
}) {
  return (
    <div>
      <div className='-mb-7 lg:-mb-5'>
        <DynamicSwiper
          className='lg:h-[400px] xs:h-[257px]'
          slides={[...Array(1)]}
          renderSlide={(_, index) => (
            <div className='w-full h-full'>
              <img
                className='w-full h-full object-contain border-2  rounded-2xl'
                src={imageUrl ? getImageURL(imageUrl) : restaurantImage}
                alt={`restaurant ${index}`}
              />
            </div>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </div>
      <RestaurantInfo name={name} address={address} />
    </div>
  );
}

export default SliderSection;

const RestaurantInfo = ({
  name,
  address,
}: {
  name: string;
  address: Record<string, any>;
}) => {
  const fullAddress = `${address?.addressLine1 || ''} ${
    address?.addressLine2 || ''
  }, ${address?.city || ''}, ${address?.state || ''}`;
  return (
    <div className='mt-10'>
      <div className='flex flex-col leading-6'>
        <div className='flex items-center gap-5 m-0  !p-0 '>
          <Text variant='body' className='font-semibold !m-0'>
            {name}
          </Text>
          <div className='flex items-center gap-1'>
            <Rating />
            <Text variant='small' className='!m-0'>
              {5}
            </Text>
          </div>
        </div>
        <div>
          <Text variant='extra-small' className='text-secondary-text !m-0'>
            Restaurant
          </Text>
        </div>
      </div>

      <div className='flex items-center gap-2 mt-3'>
        <div>
          <LocationIcon />
        </div>

        <Text variant='extra-small' className='text-secondary-text !m-0'>
          {fullAddress}
        </Text>
      </div>
    </div>
  );
};
