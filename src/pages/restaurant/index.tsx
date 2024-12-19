import useRestaurant from '@/api/restaurants/useRestaurant';
import AppLayout from '@/components/layouts/appLayout';
import AvailabilitySection from '@/components/pages-components/restaurant/availabilitySection';
import ContactSection from '@/components/pages-components/restaurant/contactSection';
import FloatingButton from '@/components/pages-components/restaurant/floatingButton';
import MenuSection from '@/components/pages-components/restaurant/menuSection';
import ServiceSection from '@/components/pages-components/restaurant/serviceSection';
import SliderSection from '@/components/pages-components/restaurant/sliderSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useSmallScreen from '@/hooks/useSmallScreen';
import Breadcrumb from '@/shared-ui/breadcrumb';
import ButtonTabs from '@/shared-ui/tabs/buttonsTabs';
import { clearCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function renderAbout() {
  return (
    <>
      <ContactSection />
      <AvailabilitySection />
    </>
  );
}
function renderDigitalMenu() {
  return <MenuSection />;
}

function RestaurantPage() {
  const { item, setItem } = useLocalStorage('RECENT_VISITED_RESTAURANT');
  const { id } = useParams();

  const { data } = useRestaurant();

  const dispatch = useAppDispatch();

  const name = data?.stores[0]?.name || 'Restaurant';
  const imageUrl = data?.stores[0]?.bucketKeyName || '';
  const address = data?.stores[0]?.address || {};

  const isSmall = useSmallScreen();

  useEffect(() => {
    if (item !== id) {
      dispatch(clearCart());
      setItem(id || '');
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      <div>
        <div className='my-4 lg:my-6'>
          <Breadcrumb
            items={[
              { label: 'Home', value: '/' },
              {
                label: name,
                value: '/restaurant/0191e0b3-6d1a-7a92-94f7-6b63eb1e0d33',
              },
            ]}
          />
        </div>
        <SliderSection imageUrl={imageUrl} name={name} address={address} />
        <ServiceSection />
        {isSmall ? (
          <ButtonTabs
            tabsData={[
              { id: 1, title: 'Digital Menu', component: renderDigitalMenu() },
              { id: 2, title: 'About', component: renderAbout() },
            ]}
          />
        ) : (
          <>
            <MenuSection />
            <ContactSection />
            <AvailabilitySection />
            {/* <MapSection /> */}
          </>
        )}

        <FloatingButton />
      </div>
    </AppLayout>
  );
}

export default RestaurantPage;
