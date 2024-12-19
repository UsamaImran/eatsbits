import DynamicSwiper from '@/shared-ui/swiper';

function TopBanners() {
  return (
    <div className=''>
      <DynamicSwiper
        className=' lg:h-[410px] xs:h-[195px]'
        slides={[...Array(5)]}
        renderSlide={() => (
          <div className="lg:bg-[url('@/assets/images/banner-pc.svg')] xs:bg-[url('@/assets/images/banner-mobile.svg')] lg:bg-cover xs:bg-contain bg-no-repeat bg-center p-10 rounded-2xl h-full text-white" />
        )}
        keyExtractor={(_, index) => index}
      />
    </div>
  );
}

export default TopBanners;
