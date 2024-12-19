import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

interface SwiperComponentProps<T> extends React.ComponentProps<typeof Swiper> {
  slides: T[];
  renderSlide: (slide: T, index: number) => React.ReactNode;
  keyExtractor: (slide: T, index: number) => number | string;
}

const DynamicSwiper = <T,>({
  slides,
  renderSlide,
  keyExtractor,
  ...rest
}: SwiperComponentProps<T>) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={`w-full ${rest.className}`}
      pagination={true}
      cssMode={true}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      {...rest}
    >
      {slides?.map((slideContent, index) => (
        <SwiperSlide
          key={keyExtractor(slideContent, index)}
          className='rounded-2xl overflow-hidden'
        >
          <div className='h-full'>{renderSlide(slideContent, index)}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DynamicSwiper;
