import AppLayout from '@/components/layouts/appLayout';
import FoodCategories from '@/components/pages-components/main/categories/foodCategories';
import TopBanners from '@/components/pages-components/main/topBanners';
import TopItems from '@/components/pages-components/main/topItems';
import TopRestaurants from '@/components/pages-components/main/topRestaurants';
import WelcomeModal from '@/components/pages-components/main/welcomeModal';

function HomePage() {
  return (
    <AppLayout>
      <div className='flex flex-col lg:gap-12 xs:gap-7 mt-5'>
        <WelcomeModal />
        <TopBanners />
        <TopItems />
        <FoodCategories />
        <TopRestaurants />
      </div>
    </AppLayout>
  );
}

export default HomePage;
